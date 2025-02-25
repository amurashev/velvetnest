import { route } from '@/utils/routing'

type BaseRoute<Params = object> = {
  params: Params
}

type BlogPostRoute = BaseRoute<{
  slug: string
}>

type PageRoute = BaseRoute<{
  pageNumber: string
}>

export const homePage = route('/')

export const blogPostRoute = route<BlogPostRoute>('/[slug]')
export const categoryRoute = route<BlogPostRoute>('/category/[slug]')
export const pageRoute = route<PageRoute>('/page/[pageNumber]')
