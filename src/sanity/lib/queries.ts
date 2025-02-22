import { groq } from "next-sanity";

export const ALL_POSTS_QUERY = groq`*[_type == "post" && defined(slug.current)] | order(_createdAt asc){
  _id, slug
}`;

export const LATEST_POSTS_FOR_CATEGORY_QUERY = groq`*[_type == "post" && category->slug.current == $slug] | order(publishedAt) [0...3]{
  _id, title, slug, mainImage, publishedAt, category, category->{
    _id, 
    slug,
    title
  }, 
}`;

export const LATEST_POSTS_QUERY = groq`*[_type == "post" && defined(slug.current)] | order(publishedAt) [0...12]{
  _id, title, slug, mainImage, publishedAt, _createdAt
}`;

export const LATEST_POSTS_FOR_POST_QUERY = groq`*[_type == "post" && defined(slug.current) && category->slug.current == $slug && _id != $id][0...3]{
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
