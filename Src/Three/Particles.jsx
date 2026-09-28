import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Particles({ count = 180, mouse }) {
  const points = useRef()
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i += 1) {
      arr[i * 3] = (Math.random() - 0.5) * 14
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8
    }
    return arr
  }, [count])

  useFrame((state) => {
    if (!points.current) return
    const t = state.clock.getElapsedTime() * 0.04
    points.current.rotation.y = t + (mouse?.current.x || 0) * 0.12
    points.current.rotation.x = (mouse?.current.y || 0) * 0.08
  })

  return (
    <points ref={points} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#a9b8ff"
        transparent
        opacity={0.55}
        depthWrite={false}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
