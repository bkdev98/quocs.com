import Head from 'next/head'

import { fadeIn, styled } from '@/stitches.config'
import Base from '@/layouts/Base'
import ListItem from '@/components/ListItem'
import FeaturedProject from '@/components/FeaturedProject'
import { ListGroup } from '@/components/ListGroup'
import stripHtml from '@/utils/stripHtml'
import { Project, getAllProjects, getProjectBySlug } from '@/utils/project'

export async function getStaticProps() {
  const allPosts = getAllProjects(['date', 'skip', 'slug', 'title', 'url'])

  const featuredParams = [
    'date',
    'slug',
    'title',
    'image',
    'content',
    'description',
  ]

  const featuredPosts = [
    getProjectBySlug('sixpm', featuredParams),
    getProjectBySlug('igourmet', featuredParams),
    // getProjectBySlug('foodwiki', featuredParams),
    getProjectBySlug('sdsp', featuredParams),
    getProjectBySlug('mimo', featuredParams),
    getProjectBySlug('koialpha', featuredParams),
    getProjectBySlug('innoteq-pos', featuredParams),
  ]

  return {
    props: {
      title: 'Projects // Quoc Khanh',
      tagline: 'Work. Hobby. Open Source.',
      image: '/static/images/home-bw.jpg',
      primaryColor: 'cyan',
      secondaryColor: 'green',
      featuredPosts,
      allPosts,
    },
  }
}

function Projects(props: {
  title: string
  tagline: string
  image: string
  primaryColor: string
  secondaryColor: string
  featuredPosts: Project[]
  allPosts: Project[]
}) {
  const renderFeatured = () => {
    return props.featuredPosts.map((post, index) => {
      return (
        <FeaturedProject
          key={index}
          index={index + ''}
          href={`/${post.slug}/`}
          title={post.title}
          description={post.description}
          image={post.image}
          date={post.date}
        />
      )
    })
  }

  const renderAll = () => {
    return props.allPosts.map((post, index) => {
      if (!post.skip) {
        return (
          <ListItem
            key={index}
            index={index + ''}
            href={post.url || `/${post.slug}/`}
            title={post.title}
            date={post.date}
          />
        )
      }
    })
  }

  const { title, image } = props
  const description = `All I want to do is <strong>build softwares</strong>. Here you can navigate to <strong>${props.allPosts.length} different</strong> case studies, websites, apps, and libraries I built. Some projects are still active, others have been discontinued.`

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={stripHtml(description)} name="description" />
        <meta content={stripHtml(description)} property="og:description" />
        <meta content="https://quocs.com/projects" property="og:url" />
        <meta content={`https://quocs.com${image}`} property="og:image" />
      </Head>

      <p dangerouslySetInnerHTML={{ __html: description }} style={{animation: `1s ease 200ms normal both 1 ${fadeIn}`}} />

      <h2 style={{animation: `1s ease 300ms normal both 1 ${fadeIn}`}}>Featured Projects</h2>
      <FeaturedProjects>{renderFeatured()}</FeaturedProjects>

      <h2 style={{animation: `1s ease 1000ms normal both 1 ${fadeIn}`}}>All Projects</h2>
      <ListGroup>{renderAll()}</ListGroup>
    </>
  )
}

const FeaturedProjects = styled('div', {
  margin: '10px 0 0 -20px',
  '@bp2': { display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' },
})

Projects.Layout = Base

export default Projects
