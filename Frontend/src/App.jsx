import { useState } from 'react'
import NavBar from './Components/NavBar.jsx'
import Home from './Components/Home.jsx'
import AssessmentWithDetails from './Components/Assessment.jsx'
import './App.css'
import Footer from './Components/Footer.jsx'

function App() {
  return (
    <>
      <nav className="sticky top-0 z-50">
        <NavBar />
      </nav>
      <main>
        <section id="home">
          <Home />
        </section>
        <section id="assessment">
          <AssessmentWithDetails/>
        </section>
      </main>
      <section id='footer'><Footer /></section>
      
    </>
  )
}

export default App