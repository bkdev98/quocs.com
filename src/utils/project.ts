import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import prism from 'remark-prism'

const projectsDirectory = join(process.cwd(), 'projects')

export type Project = {
  slug: string
  title: string
  date: string
  content?: string
  description?: string
  url?: string
  image?: string
  skip?: boolean
}

export function getProjectSlugs() {
  return fs.readdirSync(projectsDirectory)
}

export function getProjectBySlug(slug: string, fields: string[] = []): Project {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(projectsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const project = {} as any

  fields.forEach(field => {
    if (field === 'slug') {
      project[field] = realSlug
    }

    if (field === 'content') {
      project[field] = content
    }

    if (data[field]) {
      project[field] = data[field]
    }
  })

  return project
}

export function getAllProjects(fields: string[] = []): Project[] {
  const slugs = getProjectSlugs()
  const projects = slugs
    .map(slug => getProjectBySlug(slug, fields))
    .sort((project1, project2) => (project1.date > project2.date ? -1 : 1))

  return projects
}

export async function convertMarkdownToHtml(markdown: string) {
  const result = await remark()
    .use(html, { sanitize: false })
    .use(prism)
    .process(markdown)
  return result.toString()
}
