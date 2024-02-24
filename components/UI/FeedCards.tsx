import { Tweet } from '@/gql/graphql'
import Image from 'next/image'
import React from 'react'
import { AiOutlineRetweet } from 'react-icons/ai'
import { CiHeart } from 'react-icons/ci'
import { FaRegComment } from 'react-icons/fa6'
import { FiUpload } from 'react-icons/fi'

interface FeedCardsProps{
    data:Tweet
}

const FeedCards:React.FC<FeedCardsProps> = ({data}) => {
  return (
      <div className='grid grid-cols-12 transition-all cursor-pointer mb-3'>
          <div className=' col-span-1 p-2'>
            {data.author?.profileImage&&<Image className='rounded-full' src={data.author?.profileImage} alt='profile' height={50} width={50} />}
          </div>
          <div className=' col-span-11 p-2'>
              <h5>{data.author?.firstName} {data.author?.lastName}</h5>
              <p>{data.content}</p>
              <div className='flex justify-around items-center pt-4'>
                  <FaRegComment />
                  <AiOutlineRetweet />
                  <CiHeart />
                  <FiUpload />
              </div>
          </div>
    </div>
  )
}

export default FeedCards