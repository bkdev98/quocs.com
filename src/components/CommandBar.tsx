import { styled } from '../stitches.config'
import { Box } from './Box'
import Toast from './Toast'
import { useRef, useState, forwardRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import {
  KBarAnimator,
  KBarProvider,
  KBarPortal,
  useDeepMatches,
  KBarPositioner,
  KBarSearch,
  KBarResults,
} from 'kbar'
import Lottie, { LottieRef } from 'lottie-react'
import copyLinkIcon from '../../public/static/icons/copy-link.json'
import emailIcon from '../../public/static/icons/email.json'
import sourceIcon from '../../public/static/icons/source.json'
import aboutIcon from '../../public/static/icons/about.json'
import homeIcon from '../../public/static/icons/home.json'
import articlesIcon from '../../public/static/icons/articles.json'
import projectsIcon from '../../public/static/icons/projects.json'
import reminderIcon from '../../public/static/icons/reminder.json'
import talksIcon from '../../public/static/icons/talks.json'

export default function CommandBar(props: { children: React.ReactNode }) {
  const copyLinkRef = useRef<LottieRef>()
  const sourceRef = useRef<LottieRef>()
  const emailRef = useRef<LottieRef>()
  const homeRef = useRef<LottieRef>()
  const aboutRef = useRef<LottieRef>()
  const projectsRef = useRef<LottieRef>()
  const reminderRef = useRef<LottieRef>()
  const talksRef = useRef()
  const articlesRef = useRef<LottieRef>()
  const router = useRouter()
  const [showToast, setShowToast] = useState(false)

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setShowToast(true)
  }

  const iconSize = { width: 24, height: 24 }

  const actions = [
    {
      id: 'copy',
      name: 'Copy Link',
      shortcut: ['l'],
      keywords: 'copy-link',
      section: 'General',
      perform: copyLink,
      icon: <Lottie lottieRef={copyLinkRef as any} style={iconSize} animationData={copyLinkIcon} loop={false} autoplay={false} />,
    },
    {
      id: 'email',
      name: 'Send Email',
      shortcut: ['e'],
      keywords: 'send-email',
      section: 'General',
      perform: () => router.push('/contact'),
      icon: <Lottie lottieRef={emailRef as any} style={iconSize} animationData={emailIcon} loop={false} autoplay={false} />,
    },
    {
      id: 'source',
      name: 'View Source',
      shortcut: ['s'],
      keywords: 'view-source',
      section: 'General',
      perform: () =>
        window.open('https://github.com/bkdev98/quocs.com', '_blank'),
      icon: <Lottie lottieRef={sourceRef as any} style={iconSize} animationData={sourceIcon} loop={false} autoplay={false} />,
    },
    {
      id: 'home',
      name: 'Home',
      shortcut: ['g', 'h'],
      keywords: 'go-home',
      section: 'Go To',
      perform: () => router.push('/'),
      icon: <Lottie lottieRef={homeRef as any} style={iconSize} animationData={homeIcon} loop={false} autoplay={false} />,
    },
    {
      id: 'about',
      name: 'About',
      shortcut: ['g', 'a'],
      keywords: 'go-about',
      section: 'Go To',
      perform: () => router.push('/about'),
      icon: <Lottie lottieRef={aboutRef as any} style={iconSize} animationData={aboutIcon} loop={false} autoplay={false} />,
    },
    {
      id: 'projects',
      name: 'Projects',
      shortcut: ['g', 'p'],
      keywords: 'go-projects',
      section: 'Go To',
      perform: () => router.push('/projects'),
      icon: <Lottie lottieRef={projectsRef as any} style={iconSize} animationData={projectsIcon} loop={false} autoplay={false} />,
    },
    {
      id: 'talks',
      name: 'Talks',
      shortcut: ['g', 't'],
      keywords: 'go-talks',
      section: 'Go To',
      perform: () => router.push('/talks'),
      icon: <Lottie lottieRef={talksRef as any} style={iconSize} animationData={talksIcon} loop={false} autoplay={false} />,
    },
    {
      id: 'v1',
      name: 'Old Version',
      shortcut: ['g', 'o'],
      keywords: 'go-old-version',
      section: 'Go To',
      perform: () => window.open('https://2022.quocs.com', '_blank'),
      icon: <Lottie lottieRef={reminderRef as any} style={iconSize} animationData={reminderIcon} loop={false} autoplay={false} />,
    },
    {
      id: 'archived',
      name: 'Archived Blog',
      shortcut: ['g', 'b'],
      keywords: 'go-archived-blog',
      section: 'Go To',
      perform: () => window.open('https://archived.quocs.com', '_blank'),
      icon: <Lottie lottieRef={articlesRef as any} style={iconSize} animationData={articlesIcon} loop={false} autoplay={false} />,
    },
  ]

  return (
    <>
      <KBarProvider actions={actions}>
        <KBarPortal>
          <Positioner>
            <Animator>
              <Search placeholder="Type a command or search…" />
              <RenderResults />
            </Animator>
          </Positioner>
        </KBarPortal>

        {props.children}
      </KBarProvider>

      <Toast
        title="Copied :D"
        description="You can now share it with anyone."
        isSuccess={true}
        showToast={showToast}
        setShowToast={setShowToast}
      />
    </>
  )
}

function RenderResults() {
  const { results } = useDeepMatches()

  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) =>
        typeof item === 'string' ? (
          <GroupName>{item}</GroupName>
        ) : (
          <ResultItem action={item} active={active} />
        )
      }
    />
  )
}

const ResultItem = forwardRef<any, any>(({ action, active }, ref) => {
  useEffect(() => {
    if (active) {
      (action.icon as any)?.props?.lottieRef?.current?.play()
    } else {
      (action.icon as any)?.props?.lottieRef?.current?.stop()
    }
  }, [action.icon, active])

  return (
    <Box
      ref={ref}
      css={getResultStyle(active)}
      onMouseEnter={(action.icon as any)?.props?.lottieRef?.current?.play}
      onMouseLeave={(action.icon as any)?.props?.lottieRef?.current?.stop}
    >
      <Action>
        {action.icon && action.icon}
        <ActionRow>
          <span>{action.name}</span>
        </ActionRow>
      </Action>
      {action.shortcut?.length ? (
        <Shortcut aria-hidden>
          {action.shortcut.map((shortcut: string) => (
            <Kbd key={shortcut}>{shortcut}</Kbd>
          ))}
        </Shortcut>
      ) : null}
    </Box>
  )
})

ResultItem.displayName = 'ResultItem'

const Positioner = styled(KBarPositioner, {
  position: 'fixed',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  width: '100%',
  inset: '0px',
  padding: '14vh 16px 16px',
  background: 'rgba(0, 0, 0, .8)',
  boxSizing: 'border-box',
})

const Search = styled(KBarSearch, {
  padding: '12px 16px',
  fontSize: '16px',
  width: '100%',
  boxSizing: 'border-box',
  outline: 'none',
  border: 'none',
  margin: 0,
  background: '$command',
  color: '$primary',
})

const GroupName = styled('div', {
  padding: '8px 16px',
  fontSize: '10px',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  background: '$command',
})

const Kbd = styled('kbd', {
  background: 'rgba(255, 255, 255, .1)',
  color: '$secondary',
  padding: '4px 8px',
  textTransform: 'uppercase',
})

const Shortcut = styled('div', {
  display: 'grid',
  gridAutoFlow: 'column',
  gap: '4px',
})

const Action = styled('div', {
  display: 'flex',
  gap: '8px',
  alignItems: 'center',
})

const ActionRow = styled('div', {
  display: 'flex',
  flexDirection: 'column',
})

const Animator = styled(KBarAnimator, {
  backgroundColor: '#1a1c1e',
  maxWidth: '600px',
  width: '100%',
  color: '$primary',
  borderRadius: '8px',
  overflow: 'hidden',
  '@supports ((-webkit-backdrop-filter: none) or (backdrop-filter: none))': {
    backgroundColor: '$command',
    WebkitBackdropFilter: 'saturate(300%) blur(25px)',
    backdropFilter: 'saturate(300%) blur(25px)',
  },

  /* Hide scrollbar for Chrome, Safari and Opera */
  '& > div > div::-webkit-scrollbar': {
    display: 'none',
  },

  /* Hide scrollbar for IE, Edge and Firefox */
  '& > div > div': {
    '-ms-overflow-style': 'none',
    'scrollbar-width': 'none',
  },
})

const getResultStyle = (active: boolean) => {
  return {
    padding: '12px 16px',
    background: active ? 'rgba(255, 255, 255, 0.1)' : '$command',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 0,
    cursor: 'pointer',
    color: active ? '$primary' : '$secondary',
  }
}
