import { fadeIn, styled } from '../stitches.config'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProjectDate from '../components/ProjectDate'
import { Post, PostMain, PostContent, PostContainer } from '../components/Post'
import { Wrapper } from '../components/Wrapper'

export default function ProjectLayout({ children }: {
  children: React.ReactElement<{
    title: string
    image: string
    date: string
  }>
}) {
  const { title, image, date } = children.props

  return (
    <Wrapper>
      <Navbar />
      <Main image={image}>
        {image && (
          <ProjectHeader style={{animation: `1s ease 100ms normal both 1 ${fadeIn}`}}> 
            <ProjectHeaderTitle style={{animation: `1s ease 300ms normal both 1 ${fadeIn}`}}>{title}</ProjectHeaderTitle>
            <ProjectImage
              css={image ? { backgroundImage: `url(${image})` } : {}}
            />
            <ProjectHeaderSubtitle style={{animation: `1s ease 500ms normal both 1 ${fadeIn}`}}>
              <ProjectDate dateString={date} />
            </ProjectHeaderSubtitle>
          </ProjectHeader>
        )}
        <PostContent
          style={{animation: `1s ease 500ms normal both 1 ${fadeIn}`}}
          css={{
            '& ::selection': {
              background: '#ff80bf',
              color: '#000',
              WebkitTextFillColor: '#000',
            },
          }}
        >
          <PostContainer>
            {!image && (
              <div>
                <ProjectTitle>{title}</ProjectTitle>
                <ProjectSubtitle>
                  <ProjectDate dateString={date} />
                </ProjectSubtitle>
              </div>
            )}

            {children}
          </PostContainer>
        </PostContent>
      </Main>
      <Footer />
    </Wrapper>
  )
}

function Main(props: {
  image: string
  children: React.ReactNode
}) {
  return props.image ? (
    <Post>{props.children}</Post>
  ) : (
    <PostMain>{props.children}</PostMain>
  )
}

const ProjectHeader = styled('div', {
  backgroundColor: '#141618',
  minHeight: '600px',
  height: '100vh',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  flexDirection: 'column',
  zIndex: -1,
})

export const PostTitle = styled('h1', {
  textAlign: 'center',
  '@bp2': {
    fontSize: '72px',
    lineHeight: '90px',
    maxWidth: '60%',
  },
})

export const ProjectHeaderTitle = styled(PostTitle, {
  color: '#fff',
  margin: '59px auto 0',
  position: 'relative',
  zIndex: 3,
  fontSize: '36px',
  lineHeight: '48px',
  padding: '0 12px',
  '@bp2': {
    fontSize: '60px',
    lineHeight: '80px',
  },
})

export const ProjectTitle = styled(PostTitle, {
  color: '$primary',
  margin: '90px auto 0',
  maxWidth: 'none',
  fontSize: '48px',
  lineHeight: '60px',
  textAlign: 'center',
  '@bp2': {
    marginTop: 0,
  },
})

const PostSubtitle = styled('h2', {
  color: '#fff',
  fontSize: '16px',
  fontWeight: 500,
  textAlign: 'center',
})

const ProjectHeaderSubtitle = styled(PostSubtitle, {
  position: 'absolute',
  bottom: '20px',
  zIndex: 2,
  margin: '0',
  width: '100%',
})

const ProjectSubtitle = styled(PostSubtitle, {
  color: '$secondary',
  fontSize: '16px',
  margin: '0 0 60px',
})

const ProjectImage = styled('div', {
  backgroundColor: '#141618',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  position: 'fixed',
  opacity: 0.4,
  width: '100%',
  height: '100%',
  top: '0',
  left: '0',
  zIndex: 1,
  willChange: 'transform',

  '&::after': {
    content: '""',
    backgroundImage: `linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.8) 0,
      transparent 50%,
      transparent 90%,
      rgba(0, 0, 0, 0.8)
    )`,
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: '0',
    left: '0',
    zIndex: 2,
    willChange: 'transform',
  },

  '@bp4': { position: 'absolute' },
})
