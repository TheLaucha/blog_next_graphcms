/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react"
import { getFeaturedPosts } from "../services"
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"
import { FeaturedPostCard } from "../components"

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
}

const FeaturedPosts = () => {
  const [featuredPosts, setFeaturedPosts] = useState([])
  const [dataLoaded, setDataLoaded] = useState(false)

  useEffect(() => {
    getFeaturedPosts().then((result) => {
      setFeaturedPosts(result)
      setDataLoaded(true)
    })
  }, [])

  const customLeftArrow = (
    <div className='absolute left-0 text-center p-2 cursor-pointer bg-pink-600 rounded-full arrow-btn'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
        className=' text-white'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
          d='M10 19l-7-7m0 0l7-7m-7 7h18'
        />
      </svg>
    </div>
  )

  const customRightArrow = (
    <div className='absolute right-0 text-center p-2 cursor-pointer bg-pink-600 rounded-full arrow-btn'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='text-white'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
          d='M14 5l7 7m0 0l-7 7m7-7H3'
        />
      </svg>
    </div>
  )

  return (
    <div className='mb-8'>
      <Carousel
        infinite
        customLeftArrow={customLeftArrow}
        customRightArrow={customRightArrow}
        responsive={responsive}
        itemClass='px-4'
      >
        {featuredPosts.map((post) => {
          return <FeaturedPostCard key={post.slug} post={post}></FeaturedPostCard>
        })}
      </Carousel>
    </div>
  )
}

export default FeaturedPosts
