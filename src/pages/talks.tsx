import React from 'react'
import Head from 'next/head'
import { parseISO, format } from 'date-fns'
import Base from '../layouts/Base'
import { Box } from '../components/Box'
import stripHtml from '@/utils/stripHtml'
import FeaturedTalk from '@/components/FeaturedTalk'
import talks, { Talk } from '@/data/talks'

export async function getStaticProps() {
  const meta = {
    title: 'Talks // Quoc Khanh',
    tagline: 'Tech Talks. Workshop. Events.',
    image: '/static/images/home-bw.jpg',
    primaryColor: 'purple',
    secondaryColor: 'cyan',
  }

  return { props: meta }
}

function Talks(props: {
  title: string
  image: string
}) {
  const renderFeatured = () => {
    const featured = ['InApps Workshop: Deconstruct', 'CoderSchool Platform Workshop']

    return talks
      .map(item => {
        return item.talks.filter(talk => featured.includes(talk.title))
      })
      .filter(item => {
        if (item.length > 0) {
          return item
        }
      })
      .map((item, index) => {
        return <FeaturedTalk key={index} index={index.toString()} talk={item[0]} />
      })
  }

  const renderAll = () => {
    return talks.map((item, index) => {
      return (
        <div key={index}>
          <h3>{item.year}</h3>
          <p>{item.summary}</p>
          {item.talks.map((talk, tIndex) => {
            return <TalkItem key={tIndex} talk={talk} />
          })}
        </div>
      )
    })
  }

  const getTotalTalks = () => {
    let total = 0

    for (let i = 0; i < talks.length; i++) {
      total += talks[i].talks.length
    }

    return total
  }

  const { title, image } = props
  const description = `Working on my communication skill while sharing things I've learned. I've done ${getTotalTalks()} talks and workshops so far, and I'm looking forward to more.`

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={stripHtml(description)} name="description" />
        <meta content={stripHtml(description)} property="og:description" />
        <meta content="https://quocs.com/talks" property="og:url" />
        <meta content={`https://quocs.com${image}`} property="og:image" />
      </Head>

      <p dangerouslySetInnerHTML={{ __html: description }} />

      <h2>Featured Talks</h2>
      <Box css={{ margin: '10px 0 0 -20px' }}>{renderFeatured()}</Box>

      <h2>All Talks</h2>
      {renderAll()}
    </>
  )
}

function TalkItem(props: {
  talk: Talk['talks'][0]
}) {
  const { talk } = props

  return (
    <div>
      <h3>
        <a href={talk.url} target="_blank">
          {talk.title}
        </a>
      </h3>
      <ul>
        <li>
          <em>When:</em> {format(parseISO(talk.date), 'LLLL, d')}
        </li>
        <li>
          <em>Where:</em> {talk.where}
        </li>
        {talk.attendees && (
          <li>
            <em>Attendees:</em> {talk.attendees}
          </li>
        )}
        {talk.presentations &&
          talk.presentations.map((presentation, pIndex) => {
            return (
              <li key={pIndex}>
                <em>Presentation:</em>{' '}
                <a href={presentation.url} target="_blank">
                  {presentation.title}
                </a>{' '}
                {presentation.video && (
                  <a href={presentation.video} target="_blank">
                    (Video)
                  </a>
                )}
              </li>
            )
          })}
      </ul>
    </div>
  )
}

Talks.Layout = Base

export default Talks
