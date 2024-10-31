'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei/core/OrbitControls'
import { useControls, folder } from 'leva'
import { Suspense } from 'react'
import dynamic from 'next/dynamic'

const LogarithmicSpiral = dynamic(() => import('./LogarithmicSpiral').then(mod => mod.LogarithmicSpiral), {
  ssr: false
})

function Scene() {
  const controls = useControls({
    'Spiral Parameters': folder({
      a: { value: 0.5, min: 0.1, max: 2, step: 0.1 }, 
      b: { value: 0.2, min: 0.1, max: 1, step: 0.05 }, 
      thetaStart: { value: 0, min: 0, max: Math.PI * 2, step: 0.1 },
      thetaEnd: { value: Math.PI * 4, min: Math.PI, max: Math.PI * 8, step: 0.1 },
      numPoints: { value: 1000, min: 100, max: 2000, step: 100 }
    }),
    'Involute Parameters': folder(
      {
        showInvolute: { value: true, label: 'Show Involute' },
        involuteOffset: { value: 0.2, min: 0, max: 1, step: 0.01 },
        involuteGrowth: { value: 1, min: 0.1, max: 2, step: 0.1 },
        involuteColor: { value: '#00ffff' }
      },
      { collapsed: false } // Start with folder expanded
    )
  })

  return (
    <>
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <Suspense fallback={null}>
        <LogarithmicSpiral {...controls} />
      </Suspense>
    </>
  )
}

export default function Curljy() {
  return (
    <div style={{ width: '90vw', height: '90vh' }}>
      <Canvas>
        <Scene />
      </Canvas>
    </div>
  )
} 