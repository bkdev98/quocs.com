export type Talk = {
  year: string
  summary: string
  talks: {
    title: string
    date: string
    where: string
    attendees: string
    cover?: string
    stats?: string
    url?: string
    presentations: {
      title: string
      url: string
      video?: string
    }[]
  }[]
}

const talks: Talk[] = [
  {
    year: '2023',
    summary: '',
    talks: [
      {
        title: 'CoderSchool Platform Workshop',
        date: '2023-10-04',
        where: 'Ho Chi Minh City',
        attendees: '≈10',
        cover: '/static/images/talks/solid-react.jpeg',
        presentations: [
          {
            title: 'The SOLID Principles of React',
            url: 'https://solid-react.quocs.com/',
          },
        ],
      },
    ],
  },
  {
    year: '2020',
    summary: '',
    talks: [
      {
        title: 'InApps Workshop: Deconstruct',
        date: '2020-07-04',
        where: 'Ho Chi Minh City',
        url: 'https://quocs.netlify.app/blog/deconstruct/',
        attendees: '≈15',
        cover: '/static/images/talks/deconstruct-me.jpg',
        presentations: [
          {
            title: 'Deconstruct',
            url: 'https://www.icloud.com/keynote/0SzqozdJBH-C2BZtqqJi16teg#deconstruct',
          },
        ],
      },
      {
        title: 'InApps Workshop',
        date: '2020-03-16',
        where: 'Ho Chi Minh City',
        url: 'https://archived.quocs.com/tutorials/keynote-improve-user-experience-in-react-native/',
        attendees: '≈15',
        presentations: [
          {
            title: 'Improve User Experience in React Native',
            url: 'https://www.icloud.com/keynote/0PcpWV11TPCNgg6T6jxGCymAQ#improve-ux-in-react-native',
          },
        ],
      },
    ],
  },
]

export default talks