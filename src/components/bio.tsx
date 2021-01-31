import type * as React from 'react'
import styled from '@emotion/styled'
import Link from '@/theme/components/link'
import { RoundedImage } from '@/theme/components/image'
import type { IAuthor } from '@/theme/types'

const Bio: React.FC<{ author: IAuthor }> = ({ author }) => {
  return (
    <BioContainer>
      <BioAvatar
        as={author.authorsPage ? Link : 'div'}
        to={author.slug}
        data-a11y="false"
        aria-label="Author's bio"
      >
        <BioAvatarInner>
          <RoundedImage {...author.avatar} sizeHint="avatarMedium" />
        </BioAvatarInner>
      </BioAvatar>
      <BioText dangerouslySetInnerHTML={{ __html: author.bio }} />
    </BioContainer>
  )
}

export default Bio

const BioContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  left: -10px;
`

const BioAvatar = styled.div<{ to?: string }>`
  display: block;
  position: relative;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.25);
  margin-right: 16px;
  margin: 10px 26px 10px 10px;

  &::after {
    content: '';
    position: absolute;
    left: -5px;
    top: -5px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.25);
  }

  &[data-a11y='true']:focus::after {
    content: '';
    position: absolute;
    left: -5px;
    top: -5px;
    width: 50px;
    height: 50px;
    border: 2px solid ${(p) => p.theme.colors.accent};
  }
`

const BioAvatarInner = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.25);
  margin-right: 16px;
  overflow: hidden;
`

const BioText = styled.p`
  max-width: 430px;
  font-size: 14px;
  line-height: 1.45;
  color: ${(p) => p.theme.colors.grey};

  a {
    color: ${(p) => p.theme.colors.grey};
    text-decoration: underline;
  }
`
