import { Line } from '@react-three/drei/core/Line'
import * as THREE from 'three'
import { LogarithmicSpiralProps } from '../types/SpiralTypes'
import { useControls, folder } from 'leva'

export function LogarithmicSpiral({ 
  a, 
  b, 
  thetaStart, 
  thetaEnd, 
  numPoints,
  showInvolute,
  involuteOffset,
  involuteGrowth,
  involuteColor,
}: LogarithmicSpiralProps) {
  const { numSubdivisions } = useControls({
    'Subdivision Settings': folder({
      numSubdivisions: {
        value: 10,
        min: 1,
        max: 20,
        step: 1,
      }
    })
  })

  const spiralPoints: THREE.Vector3[] = []
  const involutePoints: THREE.Vector3[] = []
  const subdivisionPoints: THREE.Vector3[] = []
  const normalLines: THREE.Vector3[][] = []
  const thetaStep = (thetaEnd - thetaStart) / numPoints

  // Calculate all points first
  for (let i = 0; i <= numPoints; i++) {
    const theta = thetaStart + (i * thetaStep)
    const r = a * Math.exp(b * theta)
    
    // Spiral point
    const x = r * Math.cos(theta)
    const y = r * Math.sin(theta)
    const spiralPoint = new THREE.Vector3(x, y, 0)
    spiralPoints.push(spiralPoint)

    // Calculate involute point
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

  // Calculate subdivisions
  if (showInvolute) {
    const totalPoints = spiralPoints.length
    const step = Math.floor(totalPoints / numSubdivisions)
    
    for (let i = 0; i < numSubdivisions; i++) {
      const index = i * step
      if (index < totalPoints) {
        subdivisionPoints.push(spiralPoints[index])
        
        // Create normal line between spiral and involute
        normalLines.push([
          spiralPoints[index],
          involutePoints[index]
        ])
      }
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
        <>
          <Line 
            points={involutePoints}
            color={involuteColor}
            lineWidth={2}
          />
          {/* Draw normal lines */}
          {normalLines.map((points, index) => (
            <Line
              key={`normal-${index}`}
              points={points}
              color="yellow"
              lineWidth={1}
            />
          ))}
          {/* Draw subdivision points */}
          {subdivisionPoints.map((point, index) => (
            <mesh
              key={`point-${index}`}
              position={point}
            >
              <boxGeometry args={[0.1, 0.1, 0.1]} />
              <meshBasicMaterial color="red" />
            </mesh>
          ))}
        </>
      )}
    </group>
  )
}

export default LogarithmicSpiral