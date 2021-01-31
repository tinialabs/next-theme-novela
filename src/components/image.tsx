import type * as React from 'react'
import styled from '@emotion/styled'
import type { INovelaImage, SizeHintType } from '@/theme/types'
import getOptimizedImages from './image-optimizer'

const sizeHintWidths: Record<SizeHintType, number> = {
  full: 944,
  regular: 653,
  narrow: 457,
  seo: 1200,
  avatarSmall: 50,
  avatarMedium: 100,
  avatarLarge: 328
}

export const aspect = {
  portrait: 6 / 7,
  landscape: 3 / 2,
  square: 1,
  widescreen: 16 / 9,
  panorama: 16 / 11
}

export const getAspect = (ratio) => {
  if (typeof ratio === 'string' && aspect[ratio]) {
    return aspect[ratio]
  } else if (typeof ratio === 'number') {
    return ratio
  }
}
declare const require

export const imageRequire = require.context(
  `../../../content`,
  true,
  /\.(svg|png|jpe?g|gif|mp4)$/i
)

const Image: React.FC<INovelaImage & { className?: string }> = ({
  src,
  alt,
  sizeHint,
  aspectRatio,
  className,
  ...props
}) => {
  if (/^http/i.test(src)) {
    return (
      <BaseWrapper>
        <img className="lazyload" alt={alt} data-src={src} />
      </BaseWrapper>
    )
  }

  const {
    src: imageSrc,
    aspectRatio: originalRatio,
    lqip,
    isExport,
    ...size
  } = imageRequire(`./${src}`)

  let { width, height } = size

  const passedRatio = aspectRatio && getAspect(aspectRatio)
  const ratioValue = passedRatio || originalRatio
  if (sizeHint) {
    const targetWidth = sizeHint ? sizeHintWidths[sizeHint] : width
    if (width > targetWidth) {
      height = Math.floor(ratioValue * targetWidth)
      width = targetWidth
    }
  }

  const ratioStyle = ratioValue
    ? { paddingBottom: `${100 / ratioValue}%` }
    : undefined

  const optmizedImages = isExport
    ? {
        sizes: 'auto',
        src: imageSrc,
        srcSet: `${imageSrc} ${width}w`
      }
    : getOptimizedImages({
        src: imageSrc,
        width: width,
        height: height
      })

  return (
    <Wrapper>
      <div className="spacer" style={ratioStyle} />
      <img src={lqip} aria-hidden="true" alt={alt} />
      <img
        className="lazyload"
        alt={alt}
        src={optmizedImages.src}
        data-sizes={optmizedImages.sizes}
        data-srcset={optmizedImages.srcSet}
      />
      <noscript>
        <img src={optmizedImages.src} alt={alt} />
      </noscript>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;
  .spacer {
    display: block;
    width: 100%;
    background: rgba(125, 125, 125, 0.05);
  }
  img {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
    position: absolute;
    transition: opacity 500ms ease 0s, transform 500ms;
    &.lazyload,
    &.lazyloading {
      opacity: 0;
    }
    &.lazyloaded {
      opacity: 1;
    }
  }
`

const BaseWrapper = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;
  .spacer {
    display: block;
    width: 100%;
    background: rgba(125, 125, 125, 0.05);
  }
  img {
    width: 100%;
    object-fit: cover;
    object-position: center center;
    display: block;
    margin: auto;
    transition: opacity 500ms ease 0s, transform 500ms;
    &.lazyload,
    &.lazyloading {
      opacity: 0;
    }
    &.lazyloaded {
      opacity: 1;
    }
  }
`

export default Image

export const RoundedImage = styled(Image)`
  border-radius: 50%;
` as React.FC<INovelaImage>
