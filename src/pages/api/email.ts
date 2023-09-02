import { NextApiRequest, NextApiResponse } from 'next'
import { Resend } from 'resend'
import EmailTemplate from '@/components/EmailTemplate'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function sendEmail(
  req: NextApiRequest,
  res: NextApiResponse<{
    message: string
  }>
) {
  try {
    const data = req.body

    await resend.sendEmail({
      from: 'quocs.com <website@quocs.com>',
      to: 'khanh@quocs.com',
      reply_to: data.email,
      subject: `${data.name} - via quocs.com`,
      react: EmailTemplate(data)
    })

    res.status(200).json({ message: 'Email sent' })
  } catch (e: any) {
    res.status(500).json({ message: e.message })
  }
}
