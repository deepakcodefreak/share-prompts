'use client'
import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHamburger } from '@fortawesome/free-solid-svg-icons'

function Navbar() {
  const {data: session} = useSession()  

  const [providers, setProviders] = useState(null)
  const [showDropDown, setShowDropDown] = useState(false)

  useEffect(()=>{
    const setupProviders = async ()=>{
        const response = await getProviders();
        setProviders(response);
    }

    setupProviders()
  },[])

  return (
    <nav className='w-full flex justify-between pt-3 mb-16'>
        <Link href={'/'} className='flex items-center justify-between gap-2'>
            <Image src={'/assets/images/logo.svg'} alt='Promptopia logo' width={30} height={30} className='object-contain'/>
            <p className='logo_text'>Promtopia</p>
        </Link>

        {/* Desktop Navigation */}
        <div className="sm:flex hidden">
            {
                session?.user?
                <>
                    <div className='flex gap-3 md:gap-5'>
                        <Link href={'/create-prompt'} className='black_btn'>Create Post</Link>
                        <button type='button' className='outline_btn'>Sign Out</button>
                        <Link href={'/profile'}>
                            <Image src={session?.user?.image} alt='profile' width={30} height={30} className='rounded-full'/>
                        </Link>
                    </div>
                </>
                :<>
                    {
                        providers && Object.values(providers).map((provider)=>(
                            <button type='button' onClick={()=>signIn(provider.id)} key={provider.name} className='black_btn'>
                                Sign In 
                            </button>
                        ))
                    }                    
                </>
            }
        </div>

        {/* Mobile Navigation */}
        <div className="sm:hidden flex">
            {
                session?.user?
                <>
                    <div className='flex relative'>
                            <FontAwesomeIcon type='button' onClick={()=>setShowDropDown(!showDropDown)} icon={faHamburger} height={25} width={25}/>
                            {
                                showDropDown && <div className='bg-white flex-col gap-1 absolute top-3/4 right-0 p-2 w-max'>
                                       <Link href={'/profile'} className='dropdown_link block p-1' onClick={()=>setShowDropDown(!showDropDown)}>
                                        My Profile
                                       </Link>
                                       <Link className='dropdown_link block p-1' href={'/create-prompt'} onClick={()=>setShowDropDown(!showDropDown)}>
                                        Create prompt
                                       </Link>
                                       <button type='button' className='dropdown_link p-1' onClick={()=>signOut(provider.id)}>
                                        Sign Out 
                                       </button>
                                </div>
                            }
                    </div>
                </>:
                <>
                    {
                        providers && Object.values(providers).map((provider)=>(
                            <button type='button' onClick={()=>signIn(provider.id)} key={provider.name} className='black_btn'>
                                Sign In 
                            </button>
                        ))
                    }  
                </>
            }
        </div>
    </nav>
  )
}

export default Navbar