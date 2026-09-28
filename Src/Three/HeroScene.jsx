import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import Scene from './Scene'
import Particles from './Particles'
import FloatingObjects from './FloatingObjects'

function World({ reduced, mouse, scroll }) {
  const world = useRef()
  useFrame(() => {
    if (!world.current) return
    world.current.position.x = THREE.MathUtils.lerp(world.current.position.x, mouse.current.x * 0.18, 0.025)
    world.current.position.y = THREE.MathUtils.lerp(world.current.position.y, mouse.current.y * -0.12, 0.025)
  })
  return (
    <group ref={world}>
      <Particles count={reduced ? 48 : 150} mouse={mouse} />
      <FloatingObjects reduced={reduced} mouse={mouse} scroll={scroll} />
    </group>
  )
}

export default function HeroScene() {
  const mouse = useRef({ x: 0, y: 0 })
  const scroll = useRef(0)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(max-width: 768px), (prefers-reduced-motion: reduce)')
    const update = () => setReduced(media.matches)
    const onMove = (event) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = (event.clientY / window.innerHeight) * 2 - 1
    }
    const onScroll = () => { scroll.current = window.scrollY / Math.max(window.innerHeight, 1) }
    update()
    media.addEventListener('change', update)
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      media.removeEventListener('change', update)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <div className="global-canvas" aria-hidden="true">
      <Canvas dpr={reduced ? 1 : [1, 1.5]} camera={{ position: [0, 0, 6], fov: 45 }} gl={{ antialias: !reduced, alpha: true, powerPreference: 'high-performance' }}>
        <Suspense fallback={null}><Scene reduced={reduced}><World reduced={reduced} mouse={mouse} scroll={scroll} /></Scene></Suspense>
      </Canvas>
    </div>
  )
}
