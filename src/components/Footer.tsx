import Link from 'next/link'
import { styled } from '@/stitches.config'

type FooterLink = {
  title: string
  url: string
  icon: string
}

const links: FooterLink[] = [
  {
    title: 'Email',
    url: '/contact',
    icon: 'ri-mail-line',
  },
  {
    title: 'GitHub',
    url: 'https://github.com/bkdev98',
    icon: 'ri-github-line',
  },
]

export default function Footer() {
  const renderAnchor = (link: FooterLink, index: number) => {
    if (link.url.startsWith('http')) {
      return <Anchor key={index} href={link.url} target="_blank">
        <Title>{link.title}</Title>
        <Icon className={link.icon} />
      </Anchor>
    }

    return <Link key={index} href={link.url} passHref legacyBehavior>
      <Anchor>
        <Title>{link.title}</Title>
        <Icon className={link.icon} />
      </Anchor>
    </Link>
  }

  return (
    <Container>
      {links.map(renderAnchor)}
    </Container>
  )
}

const Container = styled('footer', {
  background: '$background',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px 0',
})

const Icon = styled('i', {
  color: '$primary',
  opacity: 1,
  marginLeft: '5px',
  marginTop: '1px',
  fontSize: '24px',
  '@bp2': { opacity: 0, fontSize: '16px' },
})

const Anchor = styled('a', {
  color: '$secondary',
  display: 'flex',
  fontSize: '15px',
  border: 0,
  marginLeft: '20px',
  textDecoration: 'none',
  textTransform: 'lowercase',
  transition: 'color $duration ease-in-out',
  '&:hover, &:focus': {
    color: '$primary',
    opacity: 1,
  },
  [`&:hover ${Icon}`]: {
    transition: 'opacity $duration ease-in-out',
    opacity: 1,
  },
  '&:first-child': { margin: '0' },
})

const Title = styled('span', {
  display: 'none',
  '@bp2': { display: 'block' },
})
