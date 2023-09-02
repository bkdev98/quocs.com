import Navbar from '@/components/Navbar'
import Head from 'next/head'
import { PostContainer, PostContent, PostMain } from '@/components/Post'
import ShortcutHome from '@/components/ShortcutHome'
import { styled } from '@/stitches.config'
import { Wrapper } from '@/components/Wrapper'
import Footer from '@/components/Footer'

type Props = {
  title: string
  description: string
  image: string
}

export async function getStaticProps() {
  return {
    props: {
      title: 'Quoc Khanh',
      description: 'Building mobile and web applications.',
      image: '/static/images/home-bw.jpg',
    },
  }
}

export default function Home({ title, description, image }: Props) {
  return (
    <Wrapper>
      <Head>
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={description} name="description" />
        <meta content={description} property="og:description" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta content="https://quocs.com" property="og:url" />
        <meta content={`https://quocs.com${image}`} property="og:image" />
      </Head>

      <Navbar />
      <HomeMain>
        <PostContent>
          <PostContainer>
            <div>
              <h1>{title}</h1>
              <p>
                <strong>Software Developer</strong><br />
                {description}
              </p>
              <ShortcutHome />
            </div>
          </PostContainer>
        </PostContent>
      </HomeMain>

      <Footer />
    </Wrapper>
  )
}

const HomeMain = styled(PostMain, {
  alignItems: 'center',
  display: 'flex',
  margin: '0 auto',
  '@bp2': { width: 800 },
})
