import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import Loader from './Components/Loader'
import CustomCursor from './Components/CustomCursor'
import Navbar from './Components/navbar'
import Hero from './Components/hero'
import About from './Components/About'
import Skills from './Components/Skills'
import Projects from './Components/Projects'
import Experience from './Components/Experience'
import Contact from './Components/Contact'
import Footer from './Components/Footer'
import ErrorBoundary from './Components/ErrorBoundary'
import { registerGsap, refreshScroll } from './animations/gsapAnimations'
import { initSectionFades } from './animations/scrollAnimations'
import './styles/global.css'
import './styles/responsive.css'

const HeroScene = lazy(() => import('./Three/HeroScene'))

export default function App() {
  const [ready, setReady] = useState(false)
  const onComplete = useCallback(() => setReady(true), [])

  useEffect(() => {
    registerGsap()
    const failsafe = window.setTimeout(() => setReady(true), 2200)
    return () => window.clearTimeout(failsafe)
  }, [])

  useEffect(() => {
    if (!ready) return undefined
    const tweens = initSectionFades()
    const id = window.setTimeout(() => refreshScroll(), 80)
    return () => {
      window.clearTimeout(id)
      tweens.forEach((tween) => tween?.scrollTrigger?.kill())
    }
  }, [ready])

  return (
    <>
      {!ready && <Loader onComplete={onComplete} />}
      <ErrorBoundary>
        <Suspense fallback={null}><HeroScene /></Suspense>
      </ErrorBoundary>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero ready={ready} />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
