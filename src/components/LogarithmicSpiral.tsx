import { Line } from '@react-three/drei/core/Line'
import * as THREE from 'three'

interface LogarithmicSpiralProps {
  a: number
  b: number
  thetaStart: number
  thetaEnd: number
  numPoints: number
}

export function LogarithmicSpiral({ 
  a, 
  b, 
  thetaStart, 
  thetaEnd, 
  numPoints 
}: LogarithmicSpiralProps) {
  const points = []
  const thetaStep = (thetaEnd - thetaStart) / numPoints

  for (let i = 0; i <= numPoints; i++) {
    const theta = thetaStart + (i * thetaStep)
    const r = a * Math.exp(b * theta)
    const x = r * Math.cos(theta)
    const y = r * Math.sin(theta)
    points.push(new THREE.Vector3(x, y, 0))
  }

  return (
    <Line 
      points={points}
      color="white"
      lineWidth={2}
    />
  )
}

export default LogarithmicSpiral 