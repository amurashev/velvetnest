import { groq } from 'next-sanity'

export const ALL_POSTS_QUERY = groq`*[_type == "post" && defined(slug.current)][0...12]{
  _id, title, slug, body, mainImage, publishedAt
}`

export const LATEST_POSTS_QUERY = groq`*[_type == "post" && defined(slug.current)][0...12]{
  _id, title, slug, body, mainImage, publishedAt
}`

export const LATEST_POSTS_FOR_POST_QUERY = groq`*[_type == "post" && defined(slug.current)][0...12]{
  _id, title, slug, mainImage
}`

export const POST_QUERY = groq`*[_type == "post" && slug.current == $slug][0]{
  _id, slug, title, body, mainImage, publishedAt
}`
