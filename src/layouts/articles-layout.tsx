import type * as React from 'react'
import styled from '@emotion/styled'
import Section from '@/theme/components/section'
import SEO from '@/theme/components/seo'
import Layout from '@/theme/components/layout'
import Paginator from '@/theme/components/navigation-paginator'
import type { IPageContextArticles, SiteProps } from '@/theme/types'
import { useRouter } from 'next/router'
import ArticlesHero from './articles/articles-hero'
import ArticlesList from './articles/articles-list'

const ArticlesPage: React.FC<{
  pageContext: IPageContextArticles
  siteProps: SiteProps
}> = ({ pageContext, siteProps }) => {
  const articles = pageContext.pageArticles
  const featuredAuthor = pageContext.featuredAuthor
  const router = useRouter()

  return (
    <Layout siteProps={siteProps}>
      <SEO pathname={router.pathname} siteProps={siteProps} />
      <ArticlesHero featuredAuthor={featuredAuthor} siteProps={siteProps} />
      <Section narrow>
        <ArticlesList articles={articles} />
        <ArticlesPaginator show={pageContext.pageCount > 1}>
          <Paginator {...pageContext} />
        </ArticlesPaginator>
      </Section>
      <ArticlesGradient />
    </Layout>
  )
}

export default ArticlesPage

const ArticlesGradient = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 590px;
  z-index: 0;
  pointer-events: none;
  background: ${(p) => p.theme.colors.gradient};
  transition: ${(p) => p.theme.colorModeTransition};
`

const ArticlesPaginator = styled.div<{ show: boolean }>`
  ${(p) => p.show && `margin-top: 95px;`}
`
