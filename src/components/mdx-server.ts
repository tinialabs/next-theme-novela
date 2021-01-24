/** CONTAINS SERVER-SIDE ONLY CODE  */
import baseRenderToString from 'next-mdx-remote/render-to-string'
import { ThemeProvider } from 'theme-ui'
import theme from '@/theme/theme-config'
import mdxOptions from '@/config/mdx-plugins'
import { mdxComponents, mdxRender, MdxSerializedSource } from './mdx-components'

/** This functions executes server side only */
export function mdxSerialize({
  content,
  scope
}: {
  content: string
  scope: Record<string, unknown> & { id: string }
}): Promise<MdxSerializedSource> {
  return baseRenderToString(content, {
    provider: {
      component: ThemeProvider,
      props: {
        components: mdxComponents(scope.id),
        theme
      }
    },
    components: mdxComponents(scope.id),
    mdxOptions,
    scope
  })
}

export default mdxRender
