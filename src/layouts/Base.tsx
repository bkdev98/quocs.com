import { fadeIn, styled } from '@/stitches.config'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { PostMain, PostContent, PostContainer } from '@/components/Post'
import { Wrapper } from '@/components/Wrapper'

export default function Base({ children }: {
  children: React.ReactElement<{
    title: string
    tagline?: string
    primaryColor: string
    secondaryColor: string
  }>
}) {
  const { title, tagline, primaryColor, secondaryColor } = children.props

  return (
    <Wrapper>
      <Navbar />
      <PostMain
        css={{
          '& ::selection': {
            background: `$${primaryColor}`,
            color: '#000',
            WebkitTextFillColor: '#000',
          },
        }}
      >
        <PostContent>
          <PostContainer>
            <GradientTitle
              key={title}
              css={{
                backgroundImage: `linear-gradient(
                135deg,
                $${primaryColor} 0%,
                $${secondaryColor} 100%
              );`,
              }}
            >
              {tagline ? tagline : title}
            </GradientTitle>
            {children}
          </PostContainer>
        </PostContent>
      </PostMain>
      <Footer />
    </Wrapper>
  )
}

const GradientTitle = styled('h1', {
  backgroundSize: '100%',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  MozBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  MozTextFillColor: 'transparent',
  WebkitBoxDecorationBreak: 'clone',
  animation: `1s ease 0s normal both 1 ${fadeIn}`
})
