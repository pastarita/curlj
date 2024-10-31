import { Line } from '@react-three/drei/core/Line'
import * as THREE from 'three'

interface LogarithmicSpiralProps {
  a: number
  b: number
  thetaStart: number
  thetaEnd: number
  numPoints: number
  showInvolute: boolean
  involuteOffset: number
  involuteGrowth: number
  involuteColor: string
}

export function LogarithmicSpiral({ 
  a, 
  b, 
  thetaStart, 
  thetaEnd, 
  numPoints,
  showInvolute,
  involuteOffset,
  involuteGrowth,
  involuteColor
}: LogarithmicSpiralProps) {
  const spiralPoints = []
  const involutePoints = []
  const thetaStep = (thetaEnd - thetaStart) / numPoints

  for (let i = 0; i <= numPoints; i++) {
    const theta = thetaStart + (i * thetaStep)
    const r = a * Math.exp(b * theta)
    
    // Spiral point
    const x = r * Math.cos(theta)
    const y = r * Math.sin(theta)
    spiralPoints.push(new THREE.Vector3(x, y, 0))

    // Calculate involute point only if needed
    if (showInvolute) {
      const dr = b * r
      const dx = r * (-Math.sin(theta)) + dr * Math.cos(theta)
      const dy = r * Math.cos(theta) + dr * Math.sin(theta)
      
      const length = Math.sqrt(dx * dx + dy * dy)
      const tx = dx / length
      const ty = dy / length

      const offset = involuteOffset * Math.pow(theta, involuteGrowth)
      
      const ix = x + offset * ty
      const iy = y - offset * tx
      involutePoints.push(new THREE.Vector3(ix, iy, 0))
    }
  }

  return (
    <group>
      <Line 
        points={spiralPoints}
        color="white"
        lineWidth={2}
      />
      {showInvolute && (
        <Line 
          points={involutePoints}
          color={involuteColor}
          lineWidth={2}
        />
      )}
    </group>
  )
}

export default LogarithmicSpiral