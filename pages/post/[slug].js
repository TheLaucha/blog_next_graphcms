import React from "react"
import { getPosts, getPostDetails } from "../../services"
import {
  PostDetail,
  Categories,
  PostWidget,
  Author,
  Comments,
  CommentsForm,
  Loader,
} from "../../components"
import { useRouter } from "next/router"

const PostDetails = ({ post }) => {
  const router = useRouter()

  if (router.isFallback) {
    return <Loader></Loader>
  }
  
  return (
    <div className='container mx-auto p-4'>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
        <div className='col-span-1 lg:col-span-8'>
          <PostDetail post={post}></PostDetail>
          <Author author={post.author}></Author>
          <CommentsForm slug={post.slug}></CommentsForm>
          <Comments slug={post.slug}></Comments>
        </div>
        <div className='col-span-1 lg:col-span-4'>
          <div className='realtive lg:sticky top-8'>
            <PostWidget
              slug={post.slug}
              categories={post.categories.map((category) => category.slug)}
            ></PostWidget>
            <Categories></Categories>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostDetails

export async function getStaticProps({ params }) {
  const data = await getPostDetails(params.slug)

  return {
    props: {
      post: data,
    },
  }
}

export async function getStaticPaths() {
  const posts = await getPosts()
  return {
    paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
    fallback: true,
  }
}
