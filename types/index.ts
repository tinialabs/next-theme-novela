import React from 'react'

export type SizeHint =
  | 'avatarSmall'
  | 'avatarMedium'
  | 'avatarLarge'
  | 'full'
  | 'narrow'
  | 'regular'
  | 'seo'

export interface INovelaImage {
  src: string
  alt: string
  width?: number
  height?: number
  sizeHint?: SizeHint
  aspectRatio?:
    | 'portrait'
    | 'landscape'
    | 'square'
    | 'widescreen'
    | 'panorama'
    | number
}

export interface IAuthor {
  slug: string
  name: string
  bio: string
  avatar: INovelaImage
  social: Array<{
    name: string
    url: string
  }>
  featured?: boolean
  authorsPage?: boolean
}

export interface IArticle {
  id: string
  slug: string
  author: string
  excerpt: string
  hero: INovelaImage
  date: string
  secret: boolean
  timeToRead?: number
  title?: string
  canonicalUrl?: string
  subscription?: boolean
}

export interface IArticleDetail extends IArticle, Record<string, any> {
  authors: IAuthor[]
}

export interface IProgress {
  height: number
  offset: number
  title: string
  mode: string
  onClose?: () => void
}

export type Icon = React.FC<{
  fill?: string
  width?: string
  height?: string
}>

export interface SEOSiteProps {
  title: string
  name: string
  siteUrl: string
  description: string
  social: Social[]
}

export interface HeroSiteProps {
  hero: {
    url?: string
    heading: string
    maxWidth: number
  }
}

export interface BlogSiteProps {
  blog: {
    contentPosts: string
    contentAuthors: string
    rootPath: string
    basePath: string
    pathPosts: string
    pathAuthors: string
    authorsPage: boolean
    mailchimp: boolean
    pageLength: number
    sources: {
      local: boolean
      contentful: boolean
    }
    copyrightYear: string
  }
}

export interface ManifestSiteProps {
  manifest: {
    name: string
    short_name: string
    start_url: string
    background_color: string
    theme_color: string
    display: string
    icon: string
  }
}

export interface AnalyticsSiteProps {
  googleAnalytics: {
    trackingId: string
  }
}

export interface SiteProps
  extends SEOSiteProps,
    HeroSiteProps,
    BlogSiteProps,
    ManifestSiteProps,
    AnalyticsSiteProps {}

export interface IPaginator {
  pageCount: number
  index: number
  pathPrefix: string
}

export interface PageContextArticles extends IPaginator {
  featuredAuthor: IAuthor
  pageArticles: IArticle[]
  mailchimp: boolean
}

export interface PageContextArticle {
  article: IArticleDetail
  nextArticles: IArticle[]
  mailchimp: boolean
}

export interface PageContextAuthor extends IPaginator {
  author: IAuthor
  pageArticles: IArticle[]
  mailchimp: boolean
}

interface Social {
  url: string
  name: string
}
