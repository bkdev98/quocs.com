import { parseISO, format } from 'date-fns'

export default function ProjectDate({ dateString }: {
  dateString: string
}) {
  if (!dateString) return <div />

  const date = parseISO(dateString)
  return <time dateTime={dateString}>{format(date, 'LLL	d, yyyy')}</time>
}
