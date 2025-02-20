import { route } from '@/utils/routing'

type BaseRoute<Params = object> = {
  params: Params
}

type BlogPostRoute = BaseRoute<{
  slug: string
}>

export const homePage = route('/')

export const blogPostRoute = route<BlogPostRoute>('/[slug]')
