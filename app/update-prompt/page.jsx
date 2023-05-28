'use client'
import React, {useState, useEffect} from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Form from '@components/Form'


function EditPrompt() {

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    })
    const router = useRouter('')
    const searchParams = useSearchParams()
    const promptId = searchParams.get('id')

    

    useEffect(()=>{
        const getPromptDetails = async ()=>{
            const res = await fetch(`/api/prompt/${promptId}`)
            const data = await res.json()
            setPost({
                prompt: data.prompt,
                tag: data.tag
            })
        }
        if(promptId) getPromptDetails();
    },[promptId])

    const updatePrompt = async (e)=>{
        e.preventDefault()
        setSubmitting(true)


        if(!promptId) return alert('Prompt Id not found')


        try {
            const response = await fetch(`/api/prompt/${promptId}`,{
                method: 'PATCH',
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag
                })
            })
            if(response.ok){
                router.push('/')
            }
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitting(false)
        }
    }

  return (
    <div>
        <Form
            type="Update"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={updatePrompt}
        />
    </div>
  )
}

export default EditPrompt