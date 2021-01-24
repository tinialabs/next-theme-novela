import { useEffect } from 'react'
import { useRouter } from 'next/router'

const scrollRestoration: Record<string, number> = {}

export function useScrollRestoration(disable: boolean = false) {
  const { asPath, events } = useRouter()

  // scroll restoration for single page display
  useEffect(() => {
    if (!disable) {
      // check shallow for `ClientBookChapter.tsx`
      const routeChangeStart = (
        url: string,
        options: { shallow?: boolean }
      ) => {
        if (!options.shallow) {
          scrollRestoration[asPath] = window.scrollY
        }
      }
      const routeChangeComplete = (
        url: string,
        options: { shallow?: boolean }
      ) => {
        if (!options.shallow) {
          window.scrollTo(0, scrollRestoration[url] || 0)
        }
      }
      events.on('routeChangeStart', routeChangeStart)
      events.on('routeChangeComplete', routeChangeComplete)
      return () => {
        events.off('routeChangeStart', routeChangeStart)
        events.off('routeChangeComplete', routeChangeComplete)
      }
    } else return undefined
  }, [asPath, events, disable])
}

export default useScrollRestoration
