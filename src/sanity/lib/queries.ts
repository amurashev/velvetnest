import { groq } from "next-sanity";

export const ALL_POSTS_QUERY = groq`*[_type == "post" && defined(slug.current)] | order(_createdAt asc){
  _id, slug
}`;

export const ALL_POSTS_COUNT_QUERY = groq`count(*[_type == "post" && defined(slug.current)])`;

export const LATEST_POSTS_FOR_CATEGORY_QUERY = groq`*[_type == "post" && category->slug.current == $slug] | order(_createdAt desc) [0...21]{
  _id, title, slug, mainImage, publishedAt, _createdAt, category, category->{
    _id, 
    slug,
    title
  }, 
}`;

export const LATEST_POSTS_QUERY = groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc) [$start...$end]{
  _id, title, slug, mainImage, publishedAt, _createdAt
}`;

export const LATEST_POSTS_FOR_POST_QUERY = groq`*[_type == "post" && defined(slug.current) && category->slug.current == $slug && _id != $id]  | order(_createdAt desc) [0...3]{
  _id, title, slug, mainImage
}`;

export const POST_QUERY = groq`*[_type == "post" && slug.current == $slug][0]{
  _id, slug, title, body, mainImage, publishedAt, category, category->{
    _id, 
    slug,
    title
  }, 
}`;

export const FULL_CATEGORY_QUERY = groq`*[_type == "category" && slug.current == $slug][0]{
  _id, slug, title
}`;
