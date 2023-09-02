import Head from 'next/head'
import { ArticleJsonLd } from 'next-seo'
import ProjectLayout from '@/layouts/Project'
import ErrorMessage from '@/components/ErrorMessage'
import { convertMarkdownToHtml, getAllProjects, getProjectBySlug } from '@/utils/project'

function Project(props: {
  errorCode?: number
  title: string
  image: string
  date: string
  content: string
  description: string
  slug: string
  canonical_url?: string
}) {
  if (props.errorCode) {
    return <ErrorMessage code={props.errorCode} />
  }

  const title = `${props.title} // Quoc Khanh`
  const description = props.description || ''
  const url = `https://quocs.com/${props.slug}`
  const date = new Date(props.date).toISOString()
  const image = props.image
    ? `https://quocs.com${props.image}`
    : 'https://quocs.com/static/images/home-bw.jpg'

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={description} name="description" />
        <meta content={description} property="og:description" />
        <meta content={url} property="og:url" />
        <meta content={image} property="og:image" />

        {props.canonical_url && (
          <link rel="canonical" href={props.canonical_url} />
        )}
      </Head>

      <ArticleJsonLd
        authorName="Quoc Khanh"
        type="Blog"
        url={url}
        title={title}
        images={[image]}
        datePublished={date}
        dateModified={date}
        description={props.description}
      />

      <div dangerouslySetInnerHTML={{ __html: props.content }} />
    </>
  )
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  try {
    const post = getProjectBySlug(params.slug, [
      'canonical_url',
      'content',
      'date',
      'description',
      'image',
      'lang',
      'slug',
      'title',
    ])

    const content = await convertMarkdownToHtml(post.content || '')

    return {
      props: {
        ...post,
        content,
      },
      revalidate: 60,
    }
  } catch (e) {
    return { props: { errorCode: 404 } }
  }
}

export async function getStaticPaths() {
  const posts = getAllProjects(['slug'])

  return {
    paths: posts.map(post => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: 'blocking',
  }
}

Project.Layout = ProjectLayout

export default Project
