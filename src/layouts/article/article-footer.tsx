import React from 'react'
import Subscription from '@/theme/components/subscription'
import type { PageContextArticle } from '@/theme/types'

const ArticleFooter: React.FC<{
  pageContext: PageContextArticle
}> = ({ pageContext }) => {
  const { article, mailchimp } = pageContext

  return <>{mailchimp && article.subscription && <Subscription />}</>
}

export default ArticleFooter
