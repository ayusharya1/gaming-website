import React, { useEffect, useRef, useState } from 'react'
import Button from './Button'
import { TiLocationArrow } from 'react-icons/ti'
import {useWindowScroll} from "react-use"
import gsap from 'gsap'
// ab humein chaiye ki jb user website k page ph hoye and jab wh jaise thoda sa hie scroll back kare th tb usseh navbar visible hoye 
//aur wh scroll pata karne k liye ki kb usnh back kiya hum "react-use" ki madad lenge
function Navbar() {
    const navConatiner=useRef(null)


    // destructing and naming scroll Y value as currentscroll
    const {y:currentscrollY}=useWindowScroll()
//now we have to put eye on scrolling for which we have to use useState
const [lastScrllY,setlastScrllY]=useState(0)
const [isNavVisible,setisNavVisible]=useState(true)
useEffect(()=>{
     // Topmost position: show navbar without floating-nav
    if(lastScrllY==0){
        setisNavVisible(true)
        navConatiner.current.classList.remove('floating-nav')
    }
    // Scrolling down: hide navbar and apply floating-nav
    else if(currentscrollY>lastScrllY){
        setisNavVisible(false)
        navConatiner.current.classList.add('floating-nav')
    }
     // Scrolling up: show navbar with floating-nav
    else if(currentscrollY<lastScrllY){
        setisNavVisible(true)
        navConatiner.current.classList.add('floating-nav')
    }
    setlastScrllY(currentscrollY)
},[currentscrollY,lastScrllY])

// for animation
useEffect(()=>{
    gsap.to(navConatiner.current,{
        y:isNavVisible?0:-100,/*If isNavVisible is true, the navigation bar moves to y: 0 (visible position).
        If isNavVisible is false, it moves to y: -100 (hidden above the screen).*/
        opacity:isNavVisible?1:0,
        duration:0.2
    })
},[isNavVisible])
// console.log(lastScrllY);

    const navItems=['Nexus','Vault','Prologue','About','Contact']
   
    const [isAudioPlaying,setAudioPlaying]=useState(false)
    const [isIndicatorActive,setIndicatorActive]=useState(false)
    const handleAudioIndicator=()=>{
        setAudioPlaying(prev=>!prev)
        setIndicatorActive(prev=>!prev)
    }
    const audioElemRef=useRef(null)
    //ab humne iski state pata karke usko ek button ph lagake k usse manage karahe hn th ab um useEffect ki madad sh usmein action perform karenge jaise play pause with the help of useRef
    useEffect(()=>{
        if(isIndicatorActive){
            audioElemRef.current.play()
        }
        else{
            audioElemRef.current.pause()
        }
    },[isAudioPlaying])
  return (//fixed isliye diya h tki fix rahe top ph
    <div ref={navConatiner} className={`fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6 `}>
        <header className='absolute top-1/2 w-full -translate-y-1/2'>
        <nav className='flex size-full items-center justify-between p-4'>
            <div className='flex items-center gap-7 '>
                <img src="/img/logo.png" className='w-10' alt="" />
                <Button
                id="product-button"
                title="Products"
                leftIcon={<TiLocationArrow/>}
                containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
                />
            </div>
            <div className='flex h-full items-center'>
                {/* md:block mtlb medium device mein visible */}
                <div className='hidden md:block'>
                    {navItems.map((item)=>(
                        <a className='nav-hover-btn' key={item} href={`#${item.toLowerCase()}`}>{item}</a>
                    ))}
                </div>
                <button className='ml-10 flex items-center space-x-0.5 scale-[1.2]' onClick={handleAudioIndicator}>
                    <audio ref={audioElemRef} className='hidden' src="/audio/loop.mp3" loop/>
                    {/* now we want to show that audio is playing with the help of some animation  aur hume isko initially hidden isliye rakha h kyunki humein wh beakr sa mp3 player nhi chaiye balki ek badhiya sa player banayenge jh niche h */}
                    {[1,2,3,4].map((bar)=>(
                        <div className={`indicator-line ${isIndicatorActive?'active':""}`} style={{animationDelay:`${bar * 0.1}s`}} key={bar}></div>
                    ))}
                    
                </button>
            </div>
        </nav>
        </header>
    </div>
  )
}

export default Navbar