import * as shortcodes from '@blocks/kit'
import styled from '@emotion/styled'
import {
  Anchor,
  Blockquote,
  Figcaption,
  CodePre,
  Headings,
  HeadingsCSS,
  HorizontalRule,
  ImageCSS,
  Lists,
  Paragraph,
  Table,
  TableCell,
  TableHead,
  TableHeadCell
} from '@/theme/components/mdx-styles'
import Code from '@/theme/components/code'
import Image from '@/theme/components/image'
import ImageZoom from '@/theme/components/image-zoom'
import baseHydrate from 'next-mdx-remote/hydrate'

import { imageRequire } from './image'
import { PrismCSS } from './code'

export interface MdxSerializedSource {
  compiledSource: string
  renderedOutput: string
  scope?: Record<string, unknown> & { id?: string }
}

/** This function executes in context of React client */
export function mdxRender(source: MdxSerializedSource) {
  return baseHydrate(source, {
    components: mdxComponents(source.scope.id)
  })
}

export const mdxComponents = (id: string) => ({
  ...shortcodes,
  img: ({ src, alt, ...rest }) =>
    /^http/i.test(src) ? (
      <Image alt={alt} src={src} />
    ) : (
      <ImageZoom
        alt={alt}
        src={
          /^http/i.test(src)
            ? src
            : imageRequire('./posts/' + id + '/' + src.replace(/^\.\//, '')).src
        }
      />
    ),
  a: Anchor,
  blockquote: Blockquote,
  h1: Headings.h2, // h1 reserved article title
  h2: Headings.h2,
  h3: Headings.h3,
  h4: Headings.h4,
  h5: Headings.h5,
  h6: Headings.h6,
  hr: HorizontalRule,
  ul: Lists.ul,
  ol: Lists.ol,
  p: Paragraph,
  code: Code,
  pre: CodePre,
  table: Table,
  thead: TableHead,
  th: TableHeadCell,
  td: TableCell,
  figcaption: Figcaption
})

/**
 * MDXBodyStyles
 * Here we're applying "global" selectors to make sure we maintain an article
 * body type feel. We're also applying all the Prism selecotors and styles within
 * the MDXBodyStyles.
 */
export const MDXBodyStyles = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  justify-content: center;
  flex-direction: column;

  ${HeadingsCSS}
  ${PrismCSS}
  ${ImageCSS}
`
