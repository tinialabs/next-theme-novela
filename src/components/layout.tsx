import { useEffect } from 'react'
import type * as React from 'react'
import { Global } from '@emotion/react'
import styled from '@emotion/styled'
import { useColorMode } from 'theme-ui'
import { globalStyles } from '@/theme/styles'
import NavigationHeader from '@/theme/components/navigation-header'
import NavigationFooter from '@/theme/components/navigation-footer'
import ArticlesContextProvider from '@/theme/layouts/articles/articles-list-context'
import { BlogSiteProps, SEOSiteProps } from '@/theme/types'

const LayoutContainer = styled.div`
  position: relative;
  background: ${(p) => p.theme.colors.background};
  transition: ${(p) => p.theme.colorModeTransition};
  min-height: 100vh;
`

/**
 * <Layout /> needs to wrap every page as it provides styles, navigation,
 * and the main structure of each page.
 */
const Layout: React.FC<{
  siteProps: BlogSiteProps & SEOSiteProps
}> = ({ siteProps, children }) => {
  const [colorMode] = useColorMode()
  useEffect(() => {
    parent.postMessage({ theme: colorMode }, '*')
  }, [colorMode])

  return (
    <ArticlesContextProvider>
      <LayoutContainer>
        <Global styles={globalStyles} />
        <NavigationHeader siteProps={siteProps} />
        {children}
        <NavigationFooter siteProps={siteProps} />
      </LayoutContainer>
    </ArticlesContextProvider>
  )
}

export default Layout
