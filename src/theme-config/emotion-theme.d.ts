import '@emotion/react'

declare module '@emotion/react' {
  export interface Theme {
    initialColorMode: string
    useCustomProperties: boolean
    colorModeTransition: string
    colors: {
      prism: any
      primary: string
      secondary: string
      grey: string
      background: string
      accent: string
      hover: string
      gradient: string
      articleText: string
      track: string
      progress: string
      card: string
      error: string
      success: string
      errorBackground: string
      horizontalRule: string
      inputBackground: string
      modes: {
        dark: {
          grey: string
          primary: string
          secondary: string
          accent: string
          background: string
          hover: string
          gradient: string
          articleText: string
          track: string
          progress: string
          card: string
          error: string
          success: string
          errorBackground: string
          horizontalRule: string
          inputBackground: string
        }
      }
    }
    fonts: {
      serif: string
      sansSerif: string
      monospace: string
    }
    breakpoints: (string | number)[][]
    tags: {
      pre: {
        variant: string
        fontFamily: string
        tabSize: number
        hyphens: string
        color: string
        bg: string
        overflow: string
        borderRadius: number
        p: number
      }
      code: {
        fontFamily: string
        fontSize: string
      }
      inlineCode: {
        borderRadius: string
        color: string
        bg: string
        paddingTop: string
        paddingBottom: string
        paddingX: string
      }
    }
  }
}
