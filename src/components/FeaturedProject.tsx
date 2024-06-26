import { fadeIn, styled } from '../stitches.config'
import { useState } from 'react'
import { motion } from 'framer-motion'
import ProjectDate from './ProjectDate'
import Link from 'next/link'

export default function FeaturedProject(props: {
  index: string
  href: string
  title: string
  description?: string
  image?: string
  date: string
}) {
  return (
    <Project href={props.href} style={{animation: `1s ease ${Number(props.index) * 50 + 300}ms normal both 1 ${fadeIn}`}}>
      <Animation index={props.index}>
        <Container>
          <ImageContainer css={{ backgroundImage: `url(${props.image})` }} />
          <Content>
            <Title>{props.title}</Title>
            <Description>{props.description}</Description>
            <Stats>
              <ProjectDate dateString={props.date} />
            </Stats>
          </Content>
        </Container>
      </Animation>
    </Project>
  )
}

function Animation(props: {
  index: string
  children: React.ReactNode
}) {
  const [hovered, setHovered] = useState('')
  const isHovered = hovered === props.index

  return (
    <AnimContainer
      onHoverStart={() => setHovered(props.index)}
      onHoverEnd={() => setHovered('')}
      className="featured-article-anim"
    >
      {isHovered && (
        <AnimHovered
          layoutId="featuredProjects"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}

      {props.children}
    </AnimContainer>
  )
}

const Project = styled(Link, {
  border: '0',
  width: '370px',
  textDecoration: 'none',
  '&:hover': { opacity: 1 },
})

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
})

const ImageContainer = styled('div', {
  borderRadius: '8px',
  width: '370px',
  height: '180px',
  marginBottom: '20px',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center center',
  filter: 'grayscale(1)',
})

const Content = styled('div', {
  maxWidth: '450px',
  marginRight: '20px',
  '@bp2': { maxWidth: '100%', marginRight: 0 },
})

const Title = styled('h3', {
  color: '$primary',
  margin: 0,
})

const Description = styled('p', {
  color: '$secondary',
  display: '-webkit-box',
  margin: 0,
  WebkitLineClamp: '2',
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
})

const Stats = styled('p', {
  margin: '5px 0 0',
  color: '$primary',
  textTransform: 'uppercase',
  display: 'inline-block',
  fontWeight: 500,
  letterSpacing: '1.2px',
  fontSize: '12px',
})

const AnimContainer = styled(motion.div, {
  position: 'relative',
  width: '100%',
  padding: '20px',
})

const AnimHovered = styled(motion.div, {
  position: 'absolute',
  top: '0',
  left: '0',
  right: '0',
  bottom: '0',
  background: '$hover',
  borderRadius: '$borderRadius',
  zIndex: -1,
})
