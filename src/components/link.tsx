import NextLink from 'next/link'

export const Link: React.FC<{
  className?: string
  to: string
  style?: any
  title?: string
}> = ({ to, children, className, title, style, ...rest }) => {
  return (
    <NextLink href={to} passHref>
      <a
        className={className}
        style={style}
        data-a11y="false"
        title={title}
        aria-label={title}
        {...rest}
      >
        {children}
      </a>
    </NextLink>
  )
}

export default Link
