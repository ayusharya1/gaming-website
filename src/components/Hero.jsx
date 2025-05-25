import React, { useEffect, useRef, useState } from 'react'
import Button from './Button'
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger)
function Hero() {
    //state for managing index
    const [currindex,setcurrindex] =useState(1)
    //state for letting know user has clicked anything
    const [hasclicked, sethasClicked] = useState(false)
    const [isloading,setisloading] = useState(true)
    const [loadedvideos, setloadedvideos] = useState(0)

    const getVideosrc=(index)=>`videos/hero-${index}.mp4`

    const totalvideos=4

    const upcomingVideosIndex=(currindex % totalvideos )+1//humlog modulo operator ka use karenge kyunki usse agar humari value ek limit k bahar jati h usseh wh limit mein leataa h jaise ki 1%10=1 and 11%10=1 th isse 11 10 ki range sh bahar gaya th usse range mein leaya  
    /* 
    ex-
    0 % 4 = 0 + 1 =1
    1 % 4 = 1 + 1 =2
    2 % 4 = 2 + 1 =3
    3 % 4 = 3 + 1 =4
    4 % 4 = 0 + 1 =1
    */
    
    

    //refernce to switch between these videos or target the different videoPlayer ,useRef() is used to target specific dom element like the div,iframe in this case which gona play that video
    const nextVdRef=useRef(null)

    //handling mini video click
    const handleMiniVdClick=()=>{
        sethasClicked(true)
        setcurrindex(upcomingVideosIndex)
    }
    
    //handling video load
    const handleVideoLoad=()=>{
        setloadedvideos((prev)=>prev+1)
    }

    function animationPart(){
        useGSAP(()=>{
            if(hasclicked){
                gsap.set('#next-video',{visibility:'visible'})
                gsap.to('#next-video',{
                    transformOrigin:'center center',
                    scale:1,
                    width:'100%',
                    height:"100%",
                    duration:1,
                    ease:"power1.inOut",
                    onStart:()=>nextVdRef.current.play()
                })
                gsap.from('#current-video',{
                    transformOrigin:'center center',
                   scale:0,
                   duration:1.5,
                   ease:"power1.inOut",
                })

            }
        },{dependencies:[currindex],revertOnUpdate:true})//comma k baad dependencies h mtlb kab function run hoga  //revert on update ka use isliye kyunki humnein revert karna har bar start sh

        useGSAP(()=>{
            // clipath k liye css clip path maker website oh jake custom clip path banasaktehn
            gsap.set('#video-frame',{
                clipPath:"polygon(14% 0%,72% 0%,90% 90%, 0% 100%)",
                borderRadius:"0 0 40% 10%"
            })
            gsap.from('#video-frame',{
                clipPath:"polygon(0% 0%,100% 0%,100% 100%, 0% 100%)",
                borderRadius:"0 0 0 0 ",
                ease:"power1.inOut",
                scrollTrigger:{
                    trigger:'#video-frame',
                    start:"center center",
                    end:"bottom center",
                    scrub:true
                }
            })
        },{})
    }
    animationPart()
    useEffect(()=>{//yh humara loaded video jab load hojayengi yh uske liye h
        if(loadedvideos===totalvideos-1){
            setisloading(false)
        }
    },[loadedvideos])
  return (
    <div className='relative w-screen h-dvh overflow-x-hidden'>
        {isloading &&(
            <div className='flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50'>
                <div className='three-body'>
                    <div className='three-body__dot'></div>
                    <div className='three-body__dot'></div>
                    <div className='three-body__dot'></div>
                </div>
            </div>
        )}
        <div id='video-frame' className='relative h-dvh w-screen overflow-hidden rounded-lg bg-blue-75'>
            <div>
                <div className='mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg'>
                    <div onClick={handleMiniVdClick} className='origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100'>
                        <video ref={nextVdRef} onLoadedData={handleVideoLoad} src={getVideosrc(upcomingVideosIndex)} loop muted id='current-video' className='size-64 origin-center scale-150 object-cover object-center'></video>
                        {/* onLoadedData yh ek special handler h yh function ko tb call karta h jb data load hojata h */}
                    </div>
                </div>
                {/* iss bar humlog upcoming index nhi pass karahe balki whi index pass karahe hn taki jh index ho whi video chale */}
                <video onLoadedData={handleVideoLoad} ref={nextVdRef} src={getVideosrc(currindex)} loop muted id='next-video' className='absolute-center invisible absolute z-20 size-64 object-cover object-center'></video>{/* yh humlog nh starting mein hidden iss liye rakhi h kyunki humein zoom in effect lagana h  */}
                
                <video src={getVideosrc(currindex>totalvideos? 1 : currindex)} onLoadedData={handleVideoLoad} autoPlay loop muted className='absolute left-0 top-0 size-full object-cover object-center'></video>
            </div>
            <h1 className='special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75'>G<b>a</b>ming</h1>
            <div className='absolute left-0 top-0 z-40 size-full'/*size-full to set an element’s width and height to be 100% of the parent container’s width and height.*/>
            <div className='mt-24 px-5 sm:px-10'>
                <h1 className='special-font hero-heading text-blue-100'>redefi<b>n</b>e</h1>
                <p className='mb-5 max-w-64 font-robert-regular text-blue-100'>Enter The Metagame Layer<br></br>Unleash the Play Economy</p>
                <Button id="watch-trailer" title="Watch Trailer" leftIcon={<TiLocationArrow/>} containerClass="!bg-yellow-300 flex-center gap-1"/>
            </div>
            </div>
        </div>
        <h1 className='special-font hero-heading absolute bottom-5 right-5 text-black z-[-1]'>G<b>a</b>ming</h1>
    </div>
  )
}

export default Hero