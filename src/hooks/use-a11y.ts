import { useRouter } from 'next/router'
import { useEffect } from 'react'

function handleAccessibilityFocus() {
  const elementsWithA11yFocus = [
    ...(document.querySelectorAll('[data-a11y]') as any)
  ]

  document.addEventListener('keyup', (event) => {
    elementsWithA11yFocus.forEach((element) => {
      if (element === event.target || element.contains(event.target)) {
        element.setAttribute('data-a11y', 'true')
      } else {
        element.setAttribute('data-a11y', 'false')
      }
    })
  })

  // On mouse click change data-a11y attribute false
  document.addEventListener('mousedown', (event) => {
    elementsWithA11yFocus.forEach((element) => {
      if (element === event.target || element.contains(event.target)) {
        element.setAttribute('data-a11y', 'false')
      }
    })
  })
}

export const useA11y = () => {
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => {
      handleAccessibilityFocus()
    }, 1000)

    const onRouteChangeComplete = () => {
      handleAccessibilityFocus()
    }

    router.events.on('routeChangeComplete', onRouteChangeComplete)

    // Unassign event listener
    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete)
    }
  }, [])
}

export default useA11y
