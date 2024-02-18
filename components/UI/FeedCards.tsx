import Image from 'next/image'
import React from 'react'
import { AiOutlineRetweet } from 'react-icons/ai'
import { CiHeart } from 'react-icons/ci'
import { FaRegComment } from 'react-icons/fa6'
import { FiUpload } from 'react-icons/fi'


const FeedCards = () => {
  return (
      <div className='grid grid-cols-12 hover:bg-slate-800 transition-all cursor-pointer'>
          <div className=' col-span-1'>
              <Image src={"https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=1024x1024&w=is&k=20&c=-mUWsTSENkugJ3qs5covpaj-bhYpxXY-v9RDpzsw504="} alt='profile' height={50} width={50}/>
          </div>
          <div className=' col-span-11 p-2'>
              <h5>Username</h5>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet harum suscipit expedita ipsum facilis deleniti laborum, quod, recusandae doloremque labore, aspernatur tenetur atque? Corporis dignissimos esse possimus itaque quaerat maxime!</p>
              <div className='flex justify-around items-center pt-2'>
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