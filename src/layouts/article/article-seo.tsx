import type * as React from 'react'
import SEO from '@/theme/components/seo'
import type { IArticleDetail, SEOSiteProps } from '@/theme/types'
import { useRouter } from 'next/router'

interface ArticleSEOProps {
  article: IArticleDetail
  imagelocation?: string
  siteProps: SEOSiteProps
}

const ArticleSEO: React.FC<ArticleSEOProps> = ({
  article,
  imagelocation,
  siteProps
}) => {
  const router = useRouter()
  const siteUrl = siteProps.siteUrl

  const authorsName = article.authors.map((author) => author.name)[0]
  const authorsSlug = article.authors.map((author) => author.slug)[0]
  const authorsBio = article.authors.map((author) => author.bio)[0]

  // Checks if the source of the image is hosted on Contentful
  if (`${article.hero.src}`.includes('ctfassets')) {
    imagelocation = `https:${article.hero.src}`
  } else {
    imagelocation = `${siteUrl + article.hero.src}`
  }

  return (
    <SEO
      authorName={authorsName}
      authorsBio={authorsBio}
      authorsSlug={authorsSlug}
      canonicalUrl={article.canonicalUrl}
      dateforSEO={article.date}
      description={article.excerpt}
      image={imagelocation}
      isBlogPost={true}
      articlepathName={siteUrl + router.pathname}
      published={article.date}
      timeToRead={article.timeToRead}
      title={article.title}
      isSecret={article.secret}
      siteProps={siteProps}
    ></SEO>
  )
}

export default ArticleSEO
