import type * as React from 'react'
import Helmet from 'react-helmet'
import type { SEOSiteProps, ISocial } from '@/theme/types'

/**
 * This react helmt code is adapted from
 * https://themeteorchef.com/tutorials/reusable-seo-with-react-helmet.
 *
 * A great tutorial explaining how to setup a robust version of an
 * SEO friendly react-helmet instance.
 *
 *
 * Use the Helmt on pages to generate SEO and meta content!
 *
 * Usage:
 * <SEO
 *   title={title}
 *   description={description}
 *   image={image}
 *   siteProps={ / * SEOSiteProps * /
 *       description: string
 *       social: ISocial[]
 *       siteUrl: string
 *       title: string
 *       name: string
 *    }
 * />
 *
 */

interface HelmetProps {
  articlepathName?: string
  authorName?: string
  authorsBio?: string
  authorsSlug?: string
  canonicalUrl?: string
  dateforSEO?: string
  description?: string
  image?: string
  isBlogPost?: boolean
  pathname?: string
  published?: string
  timeToRead?: string | number
  title?: string
  isSecret?: boolean
}

const EMPTY_SOCIAL = {} as ISocial

const themeUIDarkModeWorkaroundScript = [
  {
    type: 'text/javascript',
    innerHTML: `
    (function() {
      try {
        var mode = localStorage.getItem('theme-ui-color-mode');
        if (!mode) {
          localStorage.setItem('theme-ui-color-mode', 'light');
        }
      } catch (e) {}
    })();
  `
  }
]

const SEO: React.FC<HelmetProps & { siteProps: SEOSiteProps }> = ({
  articlepathName,
  authorName,
  authorsBio,
  authorsSlug,
  canonicalUrl,
  children,
  dateforSEO,
  description,
  image,
  isBlogPost,
  pathname,
  published,
  timeToRead,
  title,
  isSecret,
  siteProps
}) => {
  const twitter =
    siteProps.social.find((option) => option.name === 'twitter') || EMPTY_SOCIAL
  const github =
    siteProps.social.find((option) => option.name === 'github') || EMPTY_SOCIAL
  const linkedin =
    siteProps.social.find((option) => option.name === 'linkedin') ||
    EMPTY_SOCIAL
  const medium =
    siteProps.social.find((option) => option.name === 'medium') || EMPTY_SOCIAL

  const pageUrl = siteProps.siteUrl + pathname

  const fullURL = (path: string) => (path ? `${path}` : siteProps.siteUrl)

  // If no image is provided lets looks for a default novela static image
  image = image ? image : `${siteProps.siteUrl}/og-image.jpg`

  // Checks if the source of the image is hosted on Contentful
  if (`${image}`.includes('ctfassets')) {
    image = `${image}`
  } else {
    image = fullURL(image)
  }

  const siteSchema = `{
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "${siteProps.siteUrl}/#organization",
        "name": "${siteProps.title}",
        "url": "${siteProps.siteUrl}",
        "sameAs": [
          "${twitter.url}",
          "${github.url}",
          "${linkedin.url}",
          "${medium.url}"
        ],
        "logo": {
          "@type": "ImageObject",
          "@id": "${siteProps.siteUrl}/#logo",
          "inLanguage": "en-US",
          "url": "${siteProps.siteUrl}/icons/icon-512x512.png",
          "width": 512,
          "height": 512,
          "caption": "${siteProps.title}"
        },
        "image": {
          "@id": "${siteProps.siteUrl}/#logo"
        }
      },
      {
        "@type": "WebSite",
        "@id": "${siteProps.siteUrl}/#website",
        "url": "${siteProps.siteUrl}",
        "name": "${siteProps.name}",
        "description": "${siteProps.description}",
        "publisher": {
          "@id": "${siteProps.siteUrl}/#organization"
        },
        "inLanguage": "en-US"
      },
      {
        "@type": [
          "WebPage"
        ],
        "@id": "${pageUrl}/#webpage",
        "url": "${pageUrl}",
        "name": "${title || siteProps.name}",
        "isPartOf": {
          "@id": "${siteProps.siteUrl}/#website"
        },
        "about": {
          "@id": "${siteProps.siteUrl}/#organization"
        },
        "description": "${description || siteProps.description}",
        "inLanguage": "en-US"
      },
      {
        "@type": "BreadcrumbList",
        "description": "Breadcrumbs list",
        "itemListElement": [
          {
            "@type": "ListItem",
            "item": "${siteProps.siteUrl}",
            "name": "Homepage",
            "position": "1"
          }
        ],
        "name": "Breadcrumbs"
      }
    ]
  }
`.replace(/"[^"]+"|(\s)/gm, function (matched: string, group1: any) {
    if (!group1) {
      return matched
    } else {
      return ''
    }
  })

  const blogSchema = `{
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "${siteProps.siteUrl}/#organization",
        "name": "${siteProps.title}",
        "url": "${siteProps.siteUrl}",
        "sameAs": [
          "${twitter.url}",
          "${github.url}",
          "${linkedin.url}",
          "${medium.url}"
        ],
        "logo": {
          "@type": "ImageObject",
          "@id": "${siteProps.siteUrl}/#logo",
          "inLanguage": "en-US",
          "url": "${siteProps.siteUrl}/icons/icon-512x512.png",
          "width": 512,
          "height": 512,
          "caption": "${siteProps.title}"
        },
        "image": {
          "@id": "${siteProps.siteUrl}/#logo"
        }
      },
      {
        "@type": "WebSite",
        "@id": "${siteProps.siteUrl}/#website",
        "url": "${siteProps.siteUrl}",
        "name": "${siteProps.name}",
        "description": "${siteProps.description.replace(/"/g, '\\"')}",
        "publisher": {
          "@id": "${siteProps.siteUrl}/#organization"
        },
        "inLanguage": "en-US"
      },
      {
        "@type": "ImageObject",
        "@id": "${articlepathName}/#primaryimage",
        "inLanguage": "en-US",
        "url": "${image}",
        "width": 1200,
        "height": 628
      },
      {
        "@type": [
          "WebPage"
        ],
        "@id": "${articlepathName}/#webpage",
        "url": "${articlepathName}",
        "name": "${title}",
        "isPartOf": {
          "@id": "${siteProps.siteUrl}/#website"
        },
        "primaryImageOfPage": {
          "@id": "${articlepathName}/#primaryimage"
        },
        "datePublished": "${dateforSEO}",
        "dateModified": "${dateforSEO}",
        "description": "${description}",
        "breadcrumb": {
          "@id": "${articlepathName}/#breadcrumb"
        },
        "inLanguage": "en-US"
      },
      {
        "@type": "BreadcrumbList",
        "@id": "${articlepathName}/#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "item": {
              "@type": "WebPage",
              "@id": "${siteProps.siteUrl}",
              "url": "${siteProps.siteUrl}",
              "name": "Home"
            }
          },
          {
            "@type": "ListItem",
            "position": 2,
            "item": {
              "@type": "WebPage",
              "@id": "${articlepathName}",
              "url": "${articlepathName}",
              "name": "${title}"
            }
          }
        ]
      },
      {
        "@type": "Article",
        "@id": "${articlepathName}/#article",
        "isPartOf": {
          "@id": "${articlepathName}/#webpage"
        },
        "author": {
          "@id": "${siteProps.siteUrl}/#/schema${authorsSlug}"
        },
        "headline": "${title}",
        "datePublished": "${dateforSEO}",
        "dateModified": "${dateforSEO}",
        "mainEntityOfPage": {
          "@id": "${articlepathName}/#webpage"
        },
        "publisher": {
          "@id": "${siteProps.siteUrl}/#organization"
        },
        "image": {
          "@id": "${articlepathName}/#primaryimage"
        },
        "inLanguage": "en-US"
      },
      {
        "@type": [
          "Person"
        ],
        "@id": "${siteProps.siteUrl}/#/schema${authorsSlug}",
        "name": "${authorName}",
        "image": {
          "@type": "ImageObject",
        "@id": "${siteProps.siteUrl}/#personlogo",
          "inLanguage": "en-US",
          "caption": "${authorName}"
        },
        "description": "${authorsBio}",
        "sameAs": [
          "${twitter.url}",
          "${github.url}",
          "${linkedin.url}",
          "${medium.url}"
        ]
      }
    ]
  }
`.replace(/"[^"]+"|(\s)/gm, function (matched: string, group1: any) {
    if (!group1) {
      return matched
    } else {
      return ''
    }
  })

  const schema = isBlogPost ? blogSchema : siteSchema

  const metaTags: any = [
    { charset: 'utf-8' },
    {
      'http-equiv': 'X-UA-Compatible',
      content: 'IE=edge'
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1'
    },
    {
      name: 'theme-color',
      content: '#fff'
    },
    { itemprop: 'name', content: title || siteProps.title },
    { itemprop: 'description', content: description || siteProps.description },
    { itemprop: 'image', content: image },
    { name: 'description', content: description || siteProps.description },

    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:site', content: siteProps.name },
    { name: 'twitter:title', content: title || siteProps.title },
    {
      name: 'twitter:description',
      content: description || siteProps.description
    },
    { name: 'twitter:creator', content: twitter.url },
    {
      name: 'twitter:image',
      content: image
    },

    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: title || siteProps.title },
    { property: 'og:url', content: articlepathName || pageUrl },
    { property: 'og:image', content: image },
    {
      property: 'og:description',
      content: description || siteProps.description
    },
    { property: 'og:site_name', content: siteProps.name }
  ]

  if (published) {
    metaTags.push({ name: 'article:published_time', content: published })
  }

  if (timeToRead) {
    metaTags.push({ name: 'twitter:label1', value: 'Reading time' })
    metaTags.push({ name: 'twitter:data1', value: `${timeToRead} min read` })
  }

  if (isSecret) {
    metaTags.push({ name: 'robots', content: 'noindex' })
  }

  return (
    <Helmet
      title={title || siteProps.title}
      htmlAttributes={{ lang: 'en' }}
      script={themeUIDarkModeWorkaroundScript}
      meta={metaTags}
    >
      <script type="application/ld+json">{schema}</script>
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      {children}
    </Helmet>
  )
}

export default SEO
