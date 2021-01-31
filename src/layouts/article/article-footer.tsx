import type * as React from 'react'
import Subscription from '@/theme/components/subscription'
import type { IPageContextArticle } from '@/theme/types'

const ArticleFooter: React.FC<{
  pageContext: IPageContextArticle
}> = ({ pageContext }) => {
  const { article, mailchimp } = pageContext

  return <>{mailchimp && article.subscription && <Subscription />}</>
}

export default ArticleFooter
