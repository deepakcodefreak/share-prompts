'use client'
import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

import Profile from '@components/Profile'

const  ProfilePage = () => {

    const [prompts, setPrompts] = useState([])
    const {data: session} = useSession()
    const router = useRouter()

    useEffect(()=>{
        const fetchPrompts = async ()=>{
            const res = await fetch(`/api/users/${session?.user.id}/posts`)
            const data = await res.json();
            setPrompts(data);
        }
        fetchPrompts();
    },[])  

  const handleEdit = (prompt)=>{
    router.push(`/update-prompt?id=${prompt._id}`)
  } 
  
  const handleDelete = async (prompt)=>{
    const hasConfirmed = confirm('Are you sure you delete this prompt')
    if(hasConfirmed){
        try {
            await fetch(`/api/prompt/${prompt._id.toString()}`,{
                method: 'DELETE'
            })
            const filteredPrompts = prompts.filter((myprompt)=>{
                return myprompt._id !== prompt._id
            })
            setPrompts(filteredPrompts)
        } catch (error) {
            console.log(error)
        }
    }
  }

  return (
    <Profile
        name='My'
        des="Welcome to your personalized profile page"
        data={prompts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
    />
  )
}

export default ProfilePage