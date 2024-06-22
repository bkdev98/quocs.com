import Navbar from '@/components/Navbar'
import Head from 'next/head'
import { PostContainer, PostContent, PostMain } from '@/components/Post'
import ShortcutHome from '@/components/ShortcutHome'
import { fadeIn, styled } from '@/stitches.config'
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
      description: 'Building polished mobile and web experiences.',
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
              <h1 style={{animation: `1s ease 0s normal both 1 ${fadeIn}`}}>{title}</h1>
              <p style={{animation: `1s ease 100ms normal both 1 ${fadeIn}`}}>
                <strong>Software Engineer</strong><br />
                {description}
              </p>
              <div style={{animation: `1s ease 500ms normal both 1 ${fadeIn}`}}>
                <ShortcutHome />
              </div>
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
