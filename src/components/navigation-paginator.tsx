/* eslint-disable @typescript-eslint/typedef */
import type * as React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { Helmet } from 'react-helmet'
import mediaqueries from '@/theme/styles/media'
import { range } from '@/theme/utils'
import type { IPaginator } from '@/theme/types'
import Link from '@/theme/components/link'

/**
 * <Paginator />
 *
 * 1 2 3 ... final page NEXT
 * Component to navigate between different pages on a series of blog post, for example.
 *
 * We're using a <nav> element here so make sure to put the pagination component
 * INSIDE of a section to make sure the markup stays contextually relevant
 *
 * Receives the gatsby-paginator props
 */
function getPageLinks({
  pageRoot,
  current,
  count,
  maxPages
}: {
  pageRoot: string
  current: number
  count: number
  maxPages: number
}): Array<JSX.Element> {
  // Current is the page we're on
  // We want to show current - 1, current, current + 1
  // Of course if we're on page 1, we don't want a page 0
  const previousPage = current === 1 ? current : current - 1

  // Now create a range of numbers from the previousPage to the total pages (count)
  const pagesRange = range(previousPage, count + 1 - previousPage)

  // We might need to truncate that pagesRange if it's
  // more than the max pages we wish to display (3)
  const truncatedRange: Array<number | null> = pagesRange.slice(0, maxPages)

  // Throughout this function we might add a null to our pages range.
  // When it comes to rendering our range if we find a null we'll add a spacer.

  // We might need a spacer at the start of the pagination e.g. 1 ... 3 4 5 etc.
  // If we're after the second page, we need a ... spacer (3 and up)
  if (pagesRange[0] > 2) {
    truncatedRange.unshift(null)
  }
  // If we're after the first page, we need page 1 to appear (2 and up)
  if (pagesRange[0] > 1) {
    truncatedRange.unshift(1)
  }

  // If we're on the final page, then there won't be a "next" page and
  // the pagination will end up looking a bit short (e.g. on 8 pages ... 7, 8)
  // Push to the end an extra page maxPages from the end
  if (pagesRange[0] + 1 === count && pagesRange[0] - 1 > 0) {
    truncatedRange.splice(
      pagesRange.length - 1 - maxPages,
      0,
      pagesRange[0] - 1
    )
  }

  // We might need a spacer at the end of the pagination e.g. 4 5 6 ... 8
  // If we're before the penultimate page, we need a ... spacer
  if (pagesRange[0] + maxPages < count) {
    truncatedRange.push(null)
  }

  // If we're before the last page, we need page <last> to appear
  if (pagesRange[0] + maxPages - 1 < count) {
    truncatedRange.push(count)
  }

  return [...new Set(truncatedRange)].map((page: number | null, i) =>
    page === null ? (
      // If you find a null in the truncated array then add a spacer
      <Spacer key={`PaginatorPage_spacer_${i}`} aria-hidden={true} />
    ) : (
      // Otherwise render a PageButton
      <PageNumberBUtton
        key={`PaginatorPage_${page}`}
        to={getFullPath(page, { pageRoot })}
        style={{ opacity: current === page ? 1 : 0.3 }}
        className="Paginator__pageLink"
      >
        {page}
      </PageNumberBUtton>
    )
  )
}

/**
 * Utility to turn an index in to a page path.
 * All it really does is glue the page path to the front,
 * but note there's special behaviour for page 1 where the URL should be / not /page/1
 */
function getFullPath(n: number, { pageRoot }: { pageRoot: string }) {
  if (pageRoot === '/') {
    return n === 1 ? pageRoot : pageRoot + 'page/' + n
  } else {
    return n === 1 ? pageRoot : pageRoot + '/page/' + n
  }
}

const Paginator: React.FC<IPaginator & { maxPages?: number }> = ({
  pageCount: count,
  index: current,
  pathPrefix: pageRoot,
  maxPages = 3
}) => {
  const nextPath = getFullPath(current + 1, { pageRoot })
  const previousPath = getFullPath(current - 1, { pageRoot })

  if (count <= 1) return null

  const hasNext = current < count
  const hasPrevious = current > 1

  return (
    <>
      <Helmet>
        {hasPrevious && <link rel="prev" href={previousPath} />}
        {hasNext && <link rel="next" href={nextPath} />}
      </Helmet>
      <Frame>
        {hasPrevious && <PageButton to={previousPath}>Prev</PageButton>}
        {getPageLinks({ pageRoot, current, count, maxPages })}
        <MobileReference aria-hidden="true">
          <em>{current}</em>&nbsp;of {count}
        </MobileReference>
        {hasNext && <PageButton to={nextPath}>Next</PageButton>}
      </Frame>
    </>
  )
}

export default Paginator

const paginationItemMixin = (p) => css`
  line-height: 1;
  color: ${p.theme.colors.primary};
  padding: 0;
  width: 6.8rem;
  height: 6.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-variant-numeric: tabular-nums;

  ${mediaqueries.desktop_up`
    display: block;
    width: auto;
    height: auto;
    padding: 2rem;

    &:first-of-type {
      padding-left: 0;
    }

    &:last-child {
      padding-right: 0;
    }
  `}
`

const PageButton = styled(Link)`
  font-weight: 600;
  font-size: 18px;
  text-decoration: none;
  color: ${(p) => p.theme.colors.primary};
  ${paginationItemMixin}

  &:hover,
  &:focus {
    opacity: 1;
    text-decoration: underline;
  }
`

const PageNumberBUtton = styled(Link)`
  font-weight: 400;
  font-size: 18px;
  text-decoration: none;
  color: ${(p) => p.theme.colors.primary};
  ${paginationItemMixin}

  &:hover,
  &:focus {
    opacity: 1;
    text-decoration: underline;
  }
`

const Spacer = styled.span`
  opacity: 0.3;
  ${paginationItemMixin}
  &::before {
    content: '...';
  }
`

const MobileReference = styled.span`
  font-weight: 400;
  ${paginationItemMixin}
  color: ${(p) => p.theme.colors.primary};

  em {
    font-style: normal;
    color: ${(p) => p.theme.colors.primary};
  }

  ${mediaqueries.desktop_up`
    display: none;
  `}
`

const Frame = styled.nav`
  position: relative;
  z-index: 1;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;

  ${mediaqueries.tablet`
    .Paginator__pageLink, ${Spacer} { display: none; }
    left: -15px;
  `}

  ${mediaqueries.desktop_up`
    justify-content: flex-start;
  `}
`
