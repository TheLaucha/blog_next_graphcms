import React from "react"
import { Categories, PostCard, PostWidget, Loader } from "../../components"
import { getCategories, getCategoryPost, getPostsOfCategory } from "../../services"
import { useRouter } from "next/router"

const CategoryDetails = ({ posts }) => {
  const router = useRouter()

  if (router.isFallback) {
    return <Loader></Loader>
  }

  return (
    <div className='container mx-auto p-4 '>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
        <div className='lg:col-span-8 col-span-1'>
          {posts.map((post, index) => {
            return <PostCard post={post.node} key={post.node.title}></PostCard>
          })}
        </div>
        <div className='lg:col-span-8 col-span-1'>
          <div className='lg:sticky relative top-8'>
            <PostWidget></PostWidget>
            <Categories></Categories>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryDetails

// Fetch data at build time
export async function getStaticProps({ params }) {
  const posts = await getCategoryPost(params.slug)

  return {
    props: { posts },
  }
}

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
export async function getStaticPaths() {
  const categories = await getCategories()
  return {
    paths: categories.map(({ slug }) => ({ params: { slug } })),
    fallback: true,
  }
}
