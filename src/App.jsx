import React from 'react'
import Hero from './components/Hero'
import About from './components/About'
import Navbar from './components/Navbar'
import Features from './components/Features'
import Story from './components/Story'
import Contact from './components/Contact'
import Footer from './components/Footer'


//agar navigation sh sidha scroll lana h th har component k main div ko id dena h
function App() {
  return (
   <main className='relative min-h-screen w-screen overflow-x-hidden'>
    <Navbar/>
    <Hero/>
    <About/>
    <Features/>
    <Story/>
    <Contact/>
    <Footer/>
   </main>
   
  )
}

export default App