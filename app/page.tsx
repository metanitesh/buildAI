'use client'
import Image from 'next/image'
import Form from './components/form'
import { useState } from 'react'


export default function Home() {
  const [response, setResponse] = useState("")
  
  
  return (
    <>
      
      
      <div className="mx-auto max-w-2xl lg:text-center mt-10 mb-20">
            
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Extract links from zoom chat.
            </p>
            
          </div>
      
        
        <main className="lg:pl-72 flex">
          <div className="xl:pl-96 flex-grow">
            <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
              <Form setResponse={setResponse}/>
            </div>
          </div>
          </main>
          <div className='brd-1'>
            {response}
          </div>
        
        

       
        
        
      
    </>
  )
}
