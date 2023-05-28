'use client';

import React, {useState} from 'react'
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';


function PromtCard({prompt, handleTagClick, handleEdit, handleDelete}) {

  const [copy, setCopy] = useState('')
  const {data: session} = useSession()
  const pathName = usePathname();

  const handleCopy = ()=>{
    setCopy(prompt.prompt)
    navigator.clipboard.writeText(prompt.prompt)
    setTimeout(()=>{
      setCopy('')
    }, 3000)
  }

  return (
    <div className='prompt_card'>
      <div className="flex justify-between items-start gap-5">
        <div className='flex-1 justify-start flex items-center gap-3 cursor-pointer'>
          <Image src={prompt.creator.image} alt='user_image' width={40} height={40} className='rounded-full object-contain'/>
          <div className="flex flex-col">
            <h3 className='font-satoshi font-semibold text-gray-900'>{prompt.creator.username}</h3>
            <p className='font-inter text-sm text-gray-500'>{prompt.creator.email}</p>
          </div>
        </div>

        <div className="copy_btn" onClick={handleCopy}>
            <Image width={12} height={12} src={copy === postMessage.prompt ? '/assets/icons/tick.svg': '/assets/icons/copy.svg'} alt='copy-icon' width={12} height={12}/>
        </div>

      </div>
      <p className='my-4 font-satoshi text-sm text-gray-700'>
          {prompt.prompt}
      </p>
      <p className='font-inter text-sm blue_gradient cursor-pointer' onClick={()=>handleTagClick(prompt.tag)}>
        {prompt.tag}
      </p>
      {
        session?.user?.id === prompt.creator._id && pathName === "/profile" && 
        <div className='flex gap-3 pt-2 mt-2 justify-center border-t-2 border-gray-100'>
          <p className='font-inter text-sm green_gradient cursor-pointer' onClick={handleEdit}>
            Edit 
          </p>
          <p className='font-inter text-sm orange_gradient cursor-pointer' onClick={handleDelete}>
            Delete 
          </p>
        </div>
      }
    </div>
  )
}

export default PromtCard