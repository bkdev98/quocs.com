import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { parseISO, format, intervalToDuration } from 'date-fns'
import Base from '@/layouts/Base'
import items from '@/data/about'
import stripHtml from '@/utils/stripHtml'
import { fadeIn, styled } from '@/stitches.config'
import profileImage from '../../public/static/images/quocs-bw.jpg'

export async function getStaticProps() {
  const meta = {
    title: 'About // Quoc Khanh',
    description:
      "Quoc Khanh is a Vietnamese software engineer. His work focuses on building high-quality mobile and web applications.",
    tagline: 'Existence. Precedes. Essence.',
    image: '/static/images/about-bw.jpg',
    primaryColor: 'pink',
    secondaryColor: 'purple',
  }

  return { props: meta }
}

function About({ title, description, image }: {
  title: string
  description: string
  image: string
}) {
  const renderIntro = () => {
    return (
      <Container>
        <Section>
          <Image
            alt="Quoc Khanh"
            src={profileImage}
            width="336"
            height="336"
            style={{ minWidth: 'unset !important', objectFit: 'cover', filter: 'grayscale(1)' }}
            placeholder="blur"
            priority
          />
        </Section>
        <Section>
          <Paragraph
            css={{
              marginTop: '16px',
              '@bp2': { marginTop: '-6px' },
            }}
          >
            <strong>Hey, I&apos;m Quoc Khanh. </strong>
            {/* <Pronunciation /> */}
            I started as a developer back in 2017 and working with Node.js ecosystem ever since. My current tech stack is <strong>Typescript, React and React Native</strong>.
          </Paragraph>
          <Paragraph>
            I mostly worked as a software engineer at <strong>tech startups</strong>. Most recent @ <a href="https://coderschool.vn" target="_blank"><strong style={{ color: '#C14A41' }}>CoderSchool</strong></a> & <a href="https://momo.vn" target="_blank"><strong style={{ color: '#A50064' }}>MoMo</strong></a>.
          </Paragraph>
          <Paragraph>
            I&apos;m not really a perfectionist, but <strong>pixel perfect</strong> products confort my OCD soul.
            When I&apos;m not working, I like reading, watching movies, and{' '}
            <strong>clean up cat poop</strong>.
          </Paragraph>
        </Section>
      </Container>
    )
  }

  const renderAll = () => {
    return items.map((item, index) => {
      return (
        <div style={{ marginBottom: 40, animation: `1s ease ${index * 100 + 500}ms normal both 1 ${fadeIn}` }} key={index}>
          <h3>{item.jobTitle}</h3>
          <p style={{ margin: 0 }}>
            <a href={item.companyUrl} target="_blank">
              {item.company}
            </a>
            <span> • {item.location}</span>
          </p>
          <p style={{ margin: 0 }}>
            <span>{format(parseISO(item.startDate), 'LLL yyyy')}</span>
            <span> – </span>
            <span>
              {item.endDate
                ? format(parseISO(item.endDate), 'LLL yyyy')
                : 'Present'}
            </span>
            <span> • </span>
            <span>{getDuration(item.startDate, item.endDate)}</span>
          </p>
        </div>
      )
    })
  }

  const getDuration = (startDate: string, endDate?: string) => {
    const durationObj = intervalToDuration({
      start: parseISO(startDate),
      end: endDate ? parseISO(endDate) : new Date(),
    })

    let durationStr = ''

    if (durationObj.years && durationObj.years > 1) {
      durationStr = `${durationObj.years} yrs `
    } else if (durationObj.years === 1) {
      durationStr = `${durationObj.years} yr `
    }

    durationStr += `${durationObj.months} mos`

    return durationStr
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={stripHtml(description)} name="description" />
        <meta content={stripHtml(description)} property="og:description" />
        <meta content="https://quocs.com/about" property="og:url" />
        <meta content={`https://quocs.com${image}`} property="og:image" />
      </Head>

      {renderIntro()}
      <h2 style={{animation: `1s ease 500ms normal both 1 ${fadeIn}`}}>Career</h2>
      {renderAll()}
    </>
  )
}

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  '@bp2': { flexDirection: 'row' },
})

const Paragraph = styled('p', {
  '@bp2': { margin: '15px 0' },
})

const ButtonsContainer = styled('p', {
  display: 'flex',
  alignItems: 'center',
})

const Section = styled('div', {
  marginTop: '0px',
  width: 'auto',
  '@bp2': { width: '48%' },
  animation: `1s ease 200ms normal both 1 ${fadeIn}`
})

About.Layout = Base

export default About
