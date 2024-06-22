import React from 'react'
import Head from 'next/head'
import Base from '@/layouts/Base'
import Toast from '@/components/Toast'
import { Box } from '@/components/Box'
import { fadeIn, styled } from '@/stitches.config'
import stripHtml from '@/utils/stripHtml'

export async function getStaticProps() {
  const meta = {
    title: 'Contact // Quoc Khanh',
    tagline: 'No. Pigeons. Allowed.',
    image: '/static/images/home-bw.jpg',
    primaryColor: 'yellow',
    secondaryColor: 'pink',
  }

  return { props: meta }
}

function Contact({ title, image }: {
  title: string
  image: string
}) {
  const description = `Right now I'm <strong>open</strong> to new opportunities or freelance projects. Reach out and touch faith. <strong>↓</strong>`
  // const description = `I'm <strong>not available</strong> for work right now but always love a nice chat. Reach out and touch faith. <strong>↓</strong>`
  const [isEmailSent, setIsEmailSent] = React.useState<boolean | undefined>(undefined)
  const [showToast, setShowToast] = React.useState(false)

  const onSendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await fetch(`/api/email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: (e.target as any).name.value,
          email: (e.target as any).email.value,
          message: (e.target as any).message.value,
        }),
      })

      setIsEmailSent(true)
      setShowToast(true)
    }
    catch (e) {
      console.error(e)
      setIsEmailSent(false)
      setShowToast(true)
    }
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={stripHtml(description)} name="description" />
        <meta content={stripHtml(description)} property="og:description" />
        <meta content="https://quocs.com/contact" property="og:url" />
        <meta content={`https://quocs.com${image}`} property="og:image" />
      </Head>

      <Box>
        <p dangerouslySetInnerHTML={{ __html: description }} style={{animation: `1s ease 100ms normal both 1 ${fadeIn}`}} />
        <h2 style={{animation: `1s ease 300ms normal both 1 ${fadeIn}`}}>Send an email</h2>
        <Form onSubmit={onSendEmail} style={{animation: `1s ease 700ms normal both 1 ${fadeIn}`}}>
          <FormGroup>
            <Label htmlFor="name">Name</Label>
            <Input id="name" type="text" placeholder="Hippopotamus" required />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="hippo@zoo.com" required />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" placeholder="How can I help you?" rows={4} required />
          </FormGroup>
          <FormGroup>
            <Button type="submit">Send</Button>
          </FormGroup>
        </Form>

        <Toast
          title={isEmailSent ? 'Email sent :D' : 'Error :('}
          description={isEmailSent ? 'Thanks for taking the time to write it.' : 'Something wrong happened. Try again later.'}
          isSuccess={isEmailSent}
          showToast={showToast}
          setShowToast={setShowToast}
        />
      </Box>
    </>
  )
}

const Form = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '400px'
})

const FormGroup = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '10px',
})

const Label = styled('label', {
  color: '$secondary',
  textTransform: 'uppercase',
  fontSize: '12px',
  fontWeight: '500'
})

const Input = styled('input', {
  color: '$primary',
  background: 'none',
  border: '1px solid $secondary',
  borderRadius: '$borderRadius',
  padding: '10px',
  '&:focus': { outline: 'none', borderColor: '$cyan' },
})

const Textarea = styled('textarea', {
  color: '$primary',
  background: 'none',
  border: '1px solid $secondary',
  borderRadius: '$borderRadius',
  padding: '10px',
  '&:focus': { outline: 'none', borderColor: '$cyan' },
})

const Button = styled('button', {
  color: '$background',
  background: '#fff',
  border: '1px solid #fff',
  borderRadius: '$borderRadius',
  cursor: 'pointer',
  padding: '10px',
  marginTop: '5px',
  transition: 'all 0.2s ease-in-out',
  '&:hover': { background: 'transparent', borderColor: '$cyan', color: '$cyan' },
  '&:focus': { background: 'transparent', borderColor: '$cyan', color: '$cyan', outline: 'none' },
})

Contact.Layout = Base

export default Contact
