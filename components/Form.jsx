import React from 'react'
import Link from 'next/link'


function Form({
    type,
    post, 
    setPost,
    submitting,
    handleSubmit
}) {
  return (
    <section className='w-full max-w-full flex-start flex-col'>
        <h1 className='head_text text-left blue_gradient'>{type} Post</h1>
        <p className='text-left dec max-w-md'>
            {type} and share amazing prompts with the world, and let your imagination with run the AI powered platform.
        </p>

        <form onSubmit={handleSubmit} className='mt-10 m-w-2xl w-full flex flex-col gap-7 glassmorphism'>
            <label htmlFor="prompt">
                <span className='font-satoshi font-semibold text-base text-gray-700'>Your AI Prompt</span>
                <textarea name="prompt" id="" value={post.prompt} cols="30" rows="10" onChange={(e)=>setPost({...post, prompt: e.target.value})} required className='form_textarea' placeholder='Write your prompt here'></textarea>
            </label>

            <label htmlFor="tag">
                <span className='font-satoshi font-semibold text-base text-gray-700'>Tag{' '}<span>(#product, #webdev)</span></span>
                <input name="prompt" id="" value={post.tag} cols="30" rows="10" onChange={(e)=>setPost({...post, tag: e.target.value})} required className='form_input' placeholder='#tag'/>
            </label>

            <div className='flex-end mx-3 mb-5 gap-4'>
                <Link href="/" className="text-gray-500 text-sm">Cancel</Link>
                <button type='submitting' className='px-5 py-1.5 text-sm bg-primary-orange rounded-full' disabled={submitting}>{submitting? `${type}...`: type}</button>
            </div>
        </form>
    </section>
  )
}

export default Form