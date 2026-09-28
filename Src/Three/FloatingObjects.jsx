import { useRef } from 'react'
import { Float } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function FloatingObjects({ reduced = false, mouse, scroll }) {
  const group = useRef()
  const core = useRef()

  useFrame((state) => {
    if (!group.current) return
    const mx = mouse.current.x
    const my = mouse.current.y
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, mx * 0.24 + scroll.current * 0.55, 0.025)
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, my * 0.12, 0.025)
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, -scroll.current * 0.7, 0.02)
    if (core.current && !reduced) {
      core.current.rotation.x = state.clock.elapsedTime * 0.08
      core.current.rotation.y = state.clock.elapsedTime * -0.11
    }
  })

  return (
    <group ref={group} position={[2.7, 0.1, -1.5]}>
      <Float speed={reduced ? 0 : 0.75} floatIntensity={0.35} rotationIntensity={0.12}>
        <group ref={core}>
          <mesh rotation={[Math.PI / 2.8, 0.3, 0]}>
            <torusGeometry args={[1.55, 0.018, 8, 128]} />
            <meshBasicMaterial color="#8174ff" transparent opacity={0.54} />
          </mesh>
          <mesh rotation={[0.2, Math.PI / 2.25, 0.8]}>
            <torusGeometry args={[1.12, 0.012, 8, 96]} />
            <meshBasicMaterial color="#58a7ff" transparent opacity={0.4} />
          </mesh>
          <mesh>
            <icosahedronGeometry args={[0.65, 1]} />
            <meshStandardMaterial color="#121225" wireframe emissive="#695cff" emissiveIntensity={0.34} transparent opacity={0.46} />
          </mesh>
          <mesh scale={0.1}>
            <sphereGeometry args={[1, 24, 24]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        </group>
      </Float>
    </group>
  )
}
