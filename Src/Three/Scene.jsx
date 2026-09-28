export default function Scene({ children, reduced = false }) {
  return (
    <group>
      <ambientLight intensity={reduced ? 0.35 : 0.45} />
      <directionalLight position={[4, 6, 5]} intensity={reduced ? 0.6 : 0.9} color="#9db7ff" />
      <pointLight position={[-4, -2, -3]} intensity={0.5} color="#7c6cff" />
      {children}
    </group>
  )
}
