import type * as React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import mediaqueries from '@/theme/styles/media'
import CodeBlock from './code'

export const Anchor = styled.a`
  transition: ${(p) => p.theme.colorModeTransition};
  color: ${(p) => p.theme.colors.accent};

  &:visited {
    color: ${(p) => p.theme.colors.accent};
    opacity: 0.85;
  }

  &:hover,
  &:focus {
    text-decoration: underline;
  }
`

export const Blockquote = styled.blockquote`
  transition: ${(p) => p.theme.colorModeTransition};
  margin: 15px auto 50px;
  color: ${(p) => p.theme.colors.articleText};
  font-family: ${(p) => p.theme.fonts.serif};
  font-style: italic;

  ${mediaqueries.tablet`
    margin: 10px auto 35px;
  `};

  & > p {
    font-family: ${(p) => p.theme.fonts.serif};
    max-width: 880px !important;
    padding-right: 100px;
    padding-bottom: 0;
    width: 100%;
    margin: 0 auto;
    font-size: 36px;
    line-height: 1.32;
    font-weight: bold;

    ${mediaqueries.tablet`
      font-size: 26px;
      padding: 0 180px;
    `};

    ${mediaqueries.phablet`
      font-size: 36px;
      padding: 0 20px 0 40px;
    `};
  }
`

function preToCodeBlock(preProps: any) {
  if (
    preProps.children &&
    preProps.children.props &&
    preProps.children.props.mdxType === 'code'
  ) {
    const {
      children: codeString,
      className = '',
      ...props
    } = preProps.children.props

    const matches = className.match(/language-(?<lang>.*)/)

    return {
      codeString:
        typeof codeString === 'string' ? codeString.trim() : codeString,
      className,
      language:
        matches && matches.groups && matches.groups.lang
          ? matches.groups.lang
          : '',
      ...props
    }
  }
}

export const CodePre: React.FC<{}> = (preProps) => {
  const props = preToCodeBlock(preProps)

  if (props) {
    return <CodeBlock {...props} />
  } else {
    return <pre {...preProps} />
  }
}

export const Figcaption = styled.figcaption`
  color: ${(p) => p.theme.colors.grey};
  font-size: 14px;
  text-align: center;
  width: 100%;
  padding-top: 6px;
`

/**
 * Example:
 * <Heading.h1>Lorem Ipsum</Heading.h1>
 */

const commonStyles = (p) => css`
  font-weight: bold;
  color: ${p.theme.colors.primary};
  font-family: ${p.theme.fonts.serif};
`

const h1 = styled.h1`
  word-break: keep-all;
  font-size: 52px;
  line-height: 1.15;
  ${commonStyles};

  ${mediaqueries.desktop`
    font-size: 38px;
    line-height: 1.2;
  `};

  ${mediaqueries.phablet`
    font-size: 32px;
    line-height: 1.3;
  `};
`

const h2 = styled.h2`
  word-break: keep-all;
  font-size: 32px;
  line-height: 1.333;
  ${commonStyles};

  ${mediaqueries.desktop`
    font-size: 21px;
  `};

  ${mediaqueries.tablet`
    font-size: 24px;
    line-height: 1.45;
  `};

  ${mediaqueries.phablet`
    font-size: 22px;
  `};
`

const h3 = styled.h3`
  word-break: keep-all;
  font-size: 24px;
  line-height: 1.45;
  ${commonStyles};

  ${mediaqueries.tablet`
    font-size: 22px;
  `};

  ${mediaqueries.phablet`
    font-size: 20px;
  `};
`

const h4 = styled.h4`
  word-break: keep-all;
  font-size: 18px;
  line-height: 1.45;
  ${commonStyles};

  ${mediaqueries.phablet`
    font-size: 16px;
  `};
`

const h5 = styled.h5`
  word-break: keep-all;
  font-size: 18px;
  line-height: 1.45;
  ${commonStyles};

  ${mediaqueries.phablet`
    font-size: 16px;
  `};
`

const h6 = styled.h6`
  word-break: keep-all;
  font-size: 16px;
  line-height: 1.45;
  ${commonStyles};

  ${mediaqueries.phablet`
    font-size: 14px;
  `};
`

export const Headings = {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6
}

const ARTICLE_WIDTH = css`
  width: 100%;
  max-width: 680px;

  ${mediaqueries.desktop`
    max-width: 507px;
  `}

  ${mediaqueries.tablet`
    max-width: 486px;
  `};

  ${mediaqueries.phablet`
    padding: 0 20px;
  `};
`

export const HeadingsCSS = css`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0 auto;
  }

  h1,
  h1 *,
  h2,
  h2 * {
    margin: 25px auto 18px;

    ${mediaqueries.tablet`
      margin: 30px auto 18px;
    `};
  }

  h3,
  h3 * {
    margin: 20px auto 10px;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    ${ARTICLE_WIDTH};
  }
`

export const HorizontalRule = styled.hr<{ isDark?: boolean }>`
  position: relative;
  width: 100%;
  max-width: 680px;
  margin: 50px auto;
  border: 0;
  height: 14.36px;
  background-image: url('${(p) =>
    p.isDark
      ? "data:image/svg+xml,%3Csvg width='10' height='15' viewBox='0 0 10 15' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0.432617' y='13.8564' width='16' height='1' transform='rotate(-60 0.432617 13.8564)' fill='%2350525B'/%3E%3C/svg%3E%0A"
      : "data:image/svg+xml,%3Csvg width='10' height='15' viewBox='0 0 10 15' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0.567383' y='14.1777' width='16' height='1' transform='rotate(-60 0.567383 14.1777)' fill='%232D2E33'/%3E%3C/svg%3E"}');
  background-repeat: repeat-x;
  box-sizing: border-box;
  background-position: center;

  ${mediaqueries.desktop`
    max-width: 507px;
  `}

  ${mediaqueries.tablet`
    max-width: 486px;
  `};

  ${mediaqueries.phablet`
    padding: 0 20px;
  `};

  ${mediaqueries.tablet`
    width: calc(100vw - 40px);
    margin: 0px auto 50px;
  `};
`

const IMAGE_WIDTHS = {
  regular: '680px',
  large: '1004px',
  full: '100vw'
}

export const ImageCSS = css`
  .gatsby-resp-image-background-image {
    display: none !important;
  }

  .remark-oembed-inline {
    margin: 0 auto 35px;
  }

  img {
    display: inline-block;
    position: relative;
    max-width: 100%;
    height: auto;
    z-index: 0;
    margin: 15px auto 50px;
    border-radius: 5px;

    ${mediaqueries.tablet`
      margin: 10px auto 45px;
    `};
  }

  div.Image__Small,
  div.remark-oembed-inline {
    display: flex;
    flex-direction: column;
    position: relative;
    max-width: 100%;
    height: auto;
    z-index: 0;
    margin: 15px auto 50px;
    border-radius: 5px;
    width: 100%;
    max-width: 680px;

    ${mediaqueries.tablet`
      margin: 10px auto 45px;
    `};

    ${mediaqueries.desktop`
      max-width: 507px;
    `}

    ${mediaqueries.tablet`
      max-width: 486px;
      margin: 0 auto 25px;
    `};

    ${mediaqueries.phablet`
      padding: 0 20px;
    `};
  }

  .Image__Container {
    text-align: center;
  }

  img.Image__With-Shadow {
    box-shadow: 0px 15px 60px rgba(0, 0, 0, 0.15);
  }

  div.Image__Medium {
    position: relative;
    margin: 15px auto 50px;
    width: 100%;
    max-width: ${IMAGE_WIDTHS.large};

    ${mediaqueries.desktop_medium`
      left: -34px;
    `};

    ${mediaqueries.desktop`
      left: -26px;
    `};

    ${mediaqueries.tablet`
      border-radius: 0;
      left: 0;
      margin: 0 auto 25px;

      img {
        border-radius: 0;
      }
    `};
  }

  div.Image__Large {
    position: relative;
    left: -68px;
    width: ${IMAGE_WIDTHS.full};
    margin: 25px auto 60px;
    pointer-events: none;

    /* To allow interaction for all external interactions: YouTube, Twitter, Gist */
    iframe {
      pointer-events: all;
    }

    img {
      border-radius: 0;
    }

    ${mediaqueries.desktop`
      left: -53px;
    `};

    ${mediaqueries.tablet`
      left: 0;
      margin: 0 auto 25px;
    `};
  }
`

const OrderedList = styled.ol`
  list-style: none;
  counter-reset: list;
  color: ${(p) => p.theme.colors.articleText};
  position: relative;
  padding: 15px 0 30px 30px;
  margin: 0 auto;
  transition: ${(p) => p.theme.colorModeTransition};
  font-size: 18px;

  width: 100%;
  max-width: 680px;

  ${mediaqueries.desktop`
    max-width: 507px;
  `}

  ${mediaqueries.tablet`
    max-width: 486px;
    padding-left: 0px;
  `};

  ${mediaqueries.phablet`
    padding-left: 20px;
  `};

  li {
    position: relative;
    padding-bottom: 15px;

    ${mediaqueries.tablet`
      padding-left: 30px;
    `};

    ${mediaqueries.phablet`
      padding-left: 30px;
    `};

    p {
      ${mediaqueries.tablet`
        padding: 0;
      `};
    }
  }

  li > :not(ol, ul) {
    display: inline;
  }

  li::before {
    width: 3rem;
    display: inline-block;
    position: absolute;
    color: ${(p) => p.theme.colors.articleText};
  }

  li::before {
    counter-increment: list;
    content: counter(list) '.';
    font-weight: 600;
    position: absolute;
    left: -3rem;
    top: -0.3rem;
    font-size: 2rem;

    ${mediaqueries.tablet`
      left: 0;
    `};
  }
`

const UnorderedList = styled.ul`
  list-style: none;
  counter-reset: list;
  color: ${(p) => p.theme.colors.articleText};
  position: relative;
  padding: 15px 0 30px 30px;
  transition: ${(p) => p.theme.colorModeTransition};
  margin: 0 auto;
  font-size: 18px;

  width: 100%;
  max-width: 680px;

  ${mediaqueries.desktop`
    max-width: 507px;
  `}

  ${mediaqueries.tablet`
    max-width: 486px;
    padding-left: 0px;
  `};

  ${mediaqueries.phablet`
    padding-left: 20px;
  `};

  li {
    position: relative;
    padding-bottom: 15px;

    ${mediaqueries.tablet`
      padding-left: 30px;
    `};

    ${mediaqueries.phablet`
      padding-left: 30px;
    `};

    p {
      ${mediaqueries.tablet`
        padding: 0;
      `};
    }
  }

  li > :not(ol, ul) {
    display: inline;
  }

  li::before {
    width: 3rem;
    display: inline-block;
    position: absolute;
    color: ${(p) => p.theme.colors.articleText};
  }

  li::before {
    content: '';
    position: absolute;
    left: -30px;
    top: 8px;
    height: 8px;
    width: 8px;
    background: ${(p) => p.theme.colors.articleText};

    ${mediaqueries.tablet`
      left: 0;
    `};
  }
`

export const Lists = {
  ol: OrderedList,
  ul: UnorderedList
}

export const Paragraph = styled.p`
  line-height: 1.756;
  font-size: 18px;
  color: ${(p) => p.theme.colors.articleText};
  font-family: ${(p) => p.theme.fonts.sansSerif};
  transition: ${(p) => p.theme.colorModeTransition};
  margin: 0 auto 35px;
  width: 100%;
  max-width: 680px;

  b {
    font-weight: 800;
  }

  ${mediaqueries.desktop`
    max-width: 507px;
  `}

  ${mediaqueries.tablet`
    max-width: 486px;
    margin: 0 auto 25px;
  `};

  ${mediaqueries.phablet`
    padding: 0 20px;
  `};
`

export const TableCell = styled.td`
  border-top: 1px solid ${(p) => p.theme.colors.horizontalRule};
  padding: 15px 30px;
  word-break: keep-all;
  font-size: 16px;
  background: ${(p) => p.theme.colors.card};

  ${mediaqueries.desktop`
    padding: 14px 20px;
  `}

  ${mediaqueries.tablet`
    font-size: 14px;
  `}
`

export const TableHeadCell = styled.td`
  padding: 18px 30px;
  font-size: 16px;
  background: ${(p) => p.theme.colors.card};

  ${mediaqueries.desktop`
    padding: 14px 20px;
  `}

  ${mediaqueries.tablet`
    font-size: 14px;
  `}
`

export const TableHead = styled.thead`
  text-align: left;
  border-collapse: collapse;
  position: relative;
  line-height: 1.756;
  font-weight: 600;
  color: ${(p) => p.theme.colors.primary};
  font-family: ${(p) => p.theme.fonts.serif};
  transition: ${(p) => p.theme.colorModeTransition};
`

const StyledTable = styled.table`
  position: relative;
  line-height: 1.65;
  color: ${(p) => p.theme.colors.grey};
  font-family: ${(p) => p.theme.fonts.sansSerif};
  transition: ${(p) => p.theme.colorModeTransition};
  background: ${(p) => p.theme.colors.card};
  margin: 45px auto 85px;
  width: 100%;
  max-width: 1004px;
  border: 1px solid ${(p) => p.theme.colors.horizontalRule};
  border-radius: 5px;
  overflow: hidden;
  border-collapse: separate;

  ${mediaqueries.desktop`
    margin: 25px auto 65px;
  `}

  ${mediaqueries.tablet`
    max-width: 486px;
  `};

  ${mediaqueries.phablet`
    margin: 15px auto 55px;
  `};
`

export const Table: React.FC<{}> = ({ children }) => {
  return (
    <div style={{ overflowX: 'auto', padding: '0 20px' }}>
      <StyledTable>{children}</StyledTable>
    </div>
  )
}
