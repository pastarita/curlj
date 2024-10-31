'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const Curljy = dynamic(() => import('@/components/Curljy'), { 
  ssr: false,
  loading: () => (
    <div className="w-screen h-screen flex items-center justify-center">
      Loading 3D visualization...
    </div>
  )
})

export default function Home() {
  return (
    <div className="w-screen h-screen bg-black">
      <Suspense fallback={
        <div className="w-full h-full flex items-center justify-center text-white">
          Loading...
        </div>
      }>
        <Curljy />
      </Suspense>
    </div>
  )
}
