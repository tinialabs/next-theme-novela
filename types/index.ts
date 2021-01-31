import type * as React from 'react'

import type {
  IAuthor,
  IArticle,
  IArticleDetail
} from 'next-lib-content/src/types'

export type { IAuthor, IArticle, IArticleDetail }

export type {
  SizeHintType,
  INovelaImage,
  SEOSiteProps,
  HeroSiteProps,
  BlogSiteProps,
  ManifestSiteProps,
  AnalyticsSiteProps,
  SiteProps,
  ISocial
} from 'next-lib-content/src/types'

export type Icon = React.FC<{
  fill?: string
  width?: string
  height?: string
}>

export interface IProgress {
  height: number
  offset: number
  title: string
  mode: string
  onClose?: () => void
}

export interface IPaginator {
  pageCount: number
  index: number
  pathPrefix: string
}

export interface IPageContextArticles extends IPaginator {
  featuredAuthor: IAuthor
  pageArticles: IArticle[]
  mailchimp: boolean
}

export interface IPageContextArticle {
  article: IArticleDetail
  nextArticles: IArticle[]
  mailchimp: boolean
}

export interface IPageContextAuthor extends IPaginator {
  author: IAuthor
  pageArticles: IArticle[]
  mailchimp: boolean
}
