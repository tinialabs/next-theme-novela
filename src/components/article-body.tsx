import styled from '@emotion/styled'
import React from 'react'
import mediaqueries from '@/theme/styles/media'
import { MDXBodyStyles } from './mdx-components'

const ArticleBodyWrapper = styled.article`
  position: relative;
  padding: 160px 0 35px;
  padding-left: 68px;
  transition: background 0.2s linear;

  ${mediaqueries.desktop`
    padding-left: 53px;
  `}

  ${mediaqueries.tablet`
    padding: 70px 0 80px;
  `}

  ${mediaqueries.phablet`
    padding: 60px 0;
  `}
`

export const ArticleBody = React.forwardRef<
  HTMLDivElement,
  { children: unknown }
>(({ children }, ref) => {
  return (
    <ArticleBodyWrapper ref={ref}>
      <MDXBodyStyles>{children}</MDXBodyStyles>
    </ArticleBodyWrapper>
  )
})

export default ArticleBody
