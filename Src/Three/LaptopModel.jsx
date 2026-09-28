import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

const LAPTOP_MODEL_PATH = '/models/laptop.glb'
const USE_LAPTOP_GLB = false

function PlaceholderLaptop() {
  const group = useRef()

  useFrame((state) => {
    if (!group.current) return
    const t = state.clock.getElapsedTime()
    group.current.rotation.y = Math.sin(t * 0.35) * 0.28 + t * 0.08
    group.current.rotation.x = Math.sin(t * 0.4) * 0.06
  })

  return (
    <group ref={group} position={[0, -0.15, 0]}>
      <mesh position={[0, 0.02, 0]} castShadow>
        <boxGeometry args={[1.6, 0.08, 1.05]} />
        <meshStandardMaterial color="#15151d" metalness={0.7} roughness={0.28} />
      </mesh>
      <mesh position={[0, 0.72, -0.48]} rotation={[-0.18, 0, 0]} castShadow>
        <boxGeometry args={[1.58, 1.02, 0.06]} />
        <meshStandardMaterial color="#101018" metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.72, -0.445]} rotation={[-0.18, 0, 0]}>
        <planeGeometry args={[1.36, 0.82]} />
        <meshStandardMaterial color="#7c6cff" emissive="#4ea2ff" emissiveIntensity={0.45} />
      </mesh>
    </group>
  )
}

function GltfLaptop() {
  const { scene } = useGLTF(LAPTOP_MODEL_PATH)
  const cloned = useMemo(() => scene.clone(), [scene])
  const group = useRef()

  useFrame((state) => {
    if (!group.current) return
    const t = state.clock.getElapsedTime()
    group.current.rotation.y = t * 0.15
  })

  return <primitive ref={group} object={cloned} scale={1.15} />
}

export default function LaptopModel({ reduced = false }) {
  return (
    <div className="laptop-stage" aria-hidden="true">
      <Canvas
        dpr={reduced ? 1 : [1, 1.5]}
        camera={{ position: [0, 1.1, 3.2], fov: 38 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 4, 2]} intensity={1.1} />
        <Suspense fallback={null}>
          {USE_LAPTOP_GLB ? <GltfLaptop /> : <PlaceholderLaptop />}
        </Suspense>
      </Canvas>
    </div>
  )
}