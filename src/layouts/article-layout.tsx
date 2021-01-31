import { useRef, useState, useEffect } from 'react'
import type * as React from 'react'
import styled from '@emotion/styled'
import throttle from 'lodash/throttle'
import ArticleBody from '@/theme/components/article-body'
import Layout from '@/theme/components/layout'
import Progress from '@/theme/components/progress'
import Section from '@/theme/components/section'
import mediaqueries from '@/theme/styles/media'
import type { SiteProps, IPageContextArticle } from '@/theme/types'
import { debounce } from '@/theme/utils'

import ArticleAside from './article/article-aside'
import ArticleHero from './article/article-hero'
import ArticleControls from './article/article-controls'
import ArticlesNext from './article/article-next'
import ArticleSEO from './article/article-seo'
import ArticleShare from './article/article-share'
import ArticleFooter from './article/article-footer'

const ArticleLayout: React.FC<{
  pageContext: IPageContextArticle
  content: unknown
  siteProps: SiteProps
}> = ({ pageContext, content, siteProps }) => {
  const contentSectionRef = useRef<HTMLDivElement>(null)

  const [hasCalculated, setHasCalculated] = useState<boolean>(false)
  const [contentHeight, setContentHeight] = useState<number>(0)

  const { name } = siteProps

  const { article, nextArticles } = pageContext

  useEffect(() => {
    const calculateBodySize = throttle(() => {
      const contentSection = contentSectionRef.current

      if (!contentSection) return

      /**
       * If we haven't checked the content's height before,
       * we want to add listeners to the content area's
       * imagery to recheck when it's loaded
       */
      if (!hasCalculated) {
        const debouncedCalculation = debounce(calculateBodySize)
        const $imgs = contentSection.querySelectorAll('img')

        $imgs.forEach(($img) => {
          // If the image hasn't finished loading then add a listener
          if (!$img.complete) $img.onload = debouncedCalculation
        })

        // Prevent rerun of the listener attachment
        setHasCalculated(true)
      }

      // Set the height and offset of the content area
      setContentHeight(contentSection.getBoundingClientRect().height)
    }, 20)

    calculateBodySize()
    window.addEventListener('resize', calculateBodySize)

    return () => window.removeEventListener('resize', calculateBodySize)
  }, [contentSectionRef.current])

  return (
    <Layout siteProps={siteProps}>
      <ArticleSEO article={article} siteProps={siteProps} />
      <ArticleHero article={article} />
      <ArticleAside contentHeight={contentHeight}>
        <Progress contentHeight={contentHeight} />
      </ArticleAside>
      <MobileControls>
        <ArticleControls />
      </MobileControls>
      <ArticleBody ref={contentSectionRef}>
        {content}
        <ArticleShare />
      </ArticleBody>
      <ArticleFooter pageContext={pageContext} />
      {nextArticles.length > 0 && (
        <NextArticle narrow>
          <FooterNext>More articles from {name}</FooterNext>
          <ArticlesNext articles={nextArticles} />
          <FooterSpacer />
        </NextArticle>
      )}
    </Layout>
  )
}

export default ArticleLayout

const MobileControls = styled.div`
  position: relative;
  padding-top: 60px;
  transition: background 0.2s linear;
  text-align: center;

  ${mediaqueries.tablet_up`
    display: none;
  `}
`

const NextArticle = styled(Section)`
  display: block;
`

const FooterNext = styled.h3`
  position: relative;
  opacity: 0.25;
  margin-bottom: 100px;
  font-weight: 400;
  color: ${(p) => p.theme.colors.primary};

  ${mediaqueries.tablet`
    margin-bottom: 60px;
  `}

  &::after {
    content: '';
    position: absolute;
    background: ${(p) => p.theme.colors.grey};
    width: ${(910 / 1140) * 100}%;
    height: 1px;
    right: 0;
    top: 11px;

    ${mediaqueries.tablet`
      width: ${(600 / 1140) * 100}%;
    `}

    ${mediaqueries.phablet`
      width: ${(400 / 1140) * 100}%;
    `}

    ${mediaqueries.phone`
      width: 90px
    `}
  }
`

const FooterSpacer = styled.div`
  margin-bottom: 65px;
`
