import { Html } from '@react-email/html';

export default function EmailTemplate(props: {
  name: string
  email: string
  message: string
}) {
  const { name, email, message } = props

  return (
    <Html>
      <ul>
        <li><strong>Name:</strong>{' '}{name}</li>
        <li><strong>Email:</strong>{' '}{email}</li>
        <li><strong>Message:</strong>{' '}{message}</li>
      </ul>
    </Html>
  )
}