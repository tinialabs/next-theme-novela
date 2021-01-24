export type ImageLoader = (resolverProps: ImageLoaderProps) => string

export interface ImageLoaderProps {
  src: string
  width: number
  quality?: number
}

type DefaultImageLoaderProps = ImageLoaderProps & { root: string }

const VALID_LAYOUT_VALUES = [
  'fill',
  'fixed',
  'intrinsic',
  'responsive',
  undefined
] as const
type LayoutValue = typeof VALID_LAYOUT_VALUES[number]

export interface ImageProps {
  src: string
  width: string | number
  height: string | number
  sizes?: string | undefined
  loader?: ImageLoader
  quality?: number | string
  unoptimized?: boolean
}

const {
  deviceSizes: configDeviceSizes,
  imageSizes: configImageSizes,
  path: configPath,
  domains: configDomains
} = {
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  path: '/_next/image',
  domains: []
}

// sort smallest to largest
const allSizes = [...configDeviceSizes, ...configImageSizes]
configDeviceSizes.sort((a, b) => a - b)
allSizes.sort((a, b) => a - b)

function getWidths(
  width: number | undefined,
  layout: LayoutValue
): { widths: number[]; kind: 'w' | 'x' } {
  if (
    typeof width !== 'number' ||
    layout === 'fill' ||
    layout === 'responsive'
  ) {
    return { widths: configDeviceSizes, kind: 'w' }
  }

  const widths = [
    ...new Set(
      // > This means that most OLED screens that say they are 3x resolution,
      // > are actually 3x in the green color, but only 1.5x in the red and
      // > blue colors. Showing a 3x resolution image in the app vs a 2x
      // > resolution image will be visually the same, though the 3x image
      // > takes significantly more data. Even true 3x resolution screens are
      // > wasteful as the human eye cannot see that level of detail without
      // > something like a magnifying glass.
      // https://blog.twitter.com/engineering/en_us/topics/infrastructure/2019/capping-image-fidelity-on-ultra-high-resolution-devices.html
      [width, width * 2 /*, width * 3*/].map(
        (w) => allSizes.find((p) => p >= w) || allSizes[allSizes.length - 1]
      )
    )
  ]
  return { widths, kind: 'x' }
}

function generateImgAttrs({
  src,
  unoptimized,
  layout,
  width,
  quality,
  sizes,
  loader
}: {
  src: string
  unoptimized: boolean
  layout: LayoutValue
  loader: ImageLoader
  width?: number
  quality?: number
  sizes?: string
}): {
  src: string
  srcSet: string | undefined
  sizes: string | undefined
} {
  if (unoptimized) {
    return { src, srcSet: undefined, sizes: undefined }
  }

  const { widths, kind } = getWidths(width, layout)
  const last = widths.length - 1

  return {
    src: loader({ src, quality, width: widths[last] }),
    sizes: !sizes && kind === 'w' ? '100vw' : sizes,
    srcSet: widths
      .map(
        (w, i) =>
          `${loader({ src, quality, width: w })} ${
            kind === 'w' ? w : i + 1
          }${kind}`
      )
      .join(', ')
  }
}

function getInt(x: unknown): number | undefined {
  if (typeof x === 'number') {
    return x
  }
  if (typeof x === 'string') {
    return parseInt(x, 10)
  }
  return undefined
}

function defaultImageLoader(loaderProps: ImageLoaderProps) {
  return defaultLoader({ root: configPath, ...loaderProps })
}

export default function getNextImageAttributes({
  src,
  sizes,
  unoptimized = false,
  quality,
  width,
  loader = defaultImageLoader
}: ImageProps) {
  const layout: NonNullable<LayoutValue> = sizes ? 'responsive' : 'intrinsic'

  if (src && src.startsWith('data:')) {
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
    unoptimized = true
  }
  const widthInt = getInt(width)
  const qualityInt = getInt(quality)

  return generateImgAttrs({
    src,
    unoptimized,
    layout,
    width: widthInt,
    quality: qualityInt,
    sizes,
    loader
  })
}

//BUILT IN LOADERS

function normalizeSrc(src: string): string {
  return src[0] === '/' ? src.slice(1) : src
}

function defaultLoader({
  root,
  src,
  width,
  quality
}: DefaultImageLoaderProps): string {
  if (process.env.NODE_ENV !== 'production') {
    const missingValues = []

    // these should always be provided but make sure they are
    if (!src) missingValues.push('src')
    if (!width) missingValues.push('width')

    if (missingValues.length > 0) {
      throw new Error(
        `Next Image Optimization requires ${missingValues.join(
          ', '
        )} to be provided. Make sure you pass them as props to the \`next/image\` component. Received: ${JSON.stringify(
          { src, width, quality }
        )}`
      )
    }

    if (src.startsWith('//')) {
      throw new Error(
        `Failed to parse src "${src}" on \`next/image\`, protocol-relative URL (//) must be changed to an absolute URL (http:// or https://)`
      )
    }

    if (!src.startsWith('/') && configDomains) {
      let parsedSrc: URL
      try {
        parsedSrc = new URL(src)
      } catch (err) {
        console.error(err)
        throw new Error(
          `Failed to parse src "${src}" on \`next/image\`, if using relative image it must start with a leading slash "/" or be an absolute URL (http:// or https://)`
        )
      }

      if (!configDomains.includes(parsedSrc.hostname)) {
        throw new Error(
          `Invalid src prop (${src}) on \`next/image\`, hostname "${parsedSrc.hostname}" is not configured under images in your \`next.config.js\`\n` +
            `See more info: https://err.sh/next.js/next-image-unconfigured-host`
        )
      }
    }
  }

  return `${root}?url=${encodeURIComponent(src)}&w=${width}&q=${quality || 75}`
}

function imgixLoader({
  root,
  src,
  width,
  quality
}: DefaultImageLoaderProps): string {
  // Demo: https://static.imgix.net/daisy.png?format=auto&fit=max&w=300
  const params = ['auto=format', 'fit=max', 'w=' + width]
  let paramsString = ''
  if (quality) {
    params.push('q=' + quality)
  }

  if (params.length) {
    paramsString = '?' + params.join('&')
  }
  return `${root}${normalizeSrc(src)}${paramsString}`
}

function akamaiLoader({ root, src, width }: DefaultImageLoaderProps): string {
  return `${root}${normalizeSrc(src)}?imwidth=${width}`
}

function cloudinaryLoader({
  root,
  src,
  width,
  quality
}: DefaultImageLoaderProps): string {
  // Demo: https://res.cloudinary.com/demo/image/upload/w_300,c_limit,q_auto/turtles.jpg
  const params = ['f_auto', 'c_limit', 'w_' + width, 'q_' + (quality || 'auto')]
  const paramsString = params.join(',') + '/'
  return `${root}${paramsString}${normalizeSrc(src)}`
}
