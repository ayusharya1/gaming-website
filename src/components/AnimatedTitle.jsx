import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
function AnimatedTitle({ title, containerClass }) {
  const containerRef = useRef(null); //this will now allow us to start animating it

  //now useEffect will allow perform some actions when things on page change

  //     /*👉 useEffect ek React Hook hai jo component mount hone ke baad kuch actions perform karta hai.
  // 👉 [] (empty array) ka matlab hai ki yeh sirf component ke first load hone par chalega (page load hone par ek baar).*/
  useEffect(
    () => {
      const ctx = gsap.context(() => {
        /*👉 gsap.context() ek context banata hai jo animation elements ko manage karta hai👉 Isse ensure hota hai ki useEffect ke andar jo bhi GSAP animations likhi hain, unka proper cleanup ho jab component unmount ho.*/
        const titleAnimation = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "100 bottom",
            end: "center bottom",
            toggleActions: "play none none reverse", //Jab user scroll wapas upar karega → Animation reverse ho jayega.
          },
        });
        /*👉 GSAP Timeline ek animation sequence banata hai jo ScrollTrigger ka use karega.
//             👉 ScrollTrigger ka matlab hai ki scroll karne par animation trigger hoga.
//             👉 Trigger ka kya matlab hai?
            
//             trigger: containerRef.current → Yeh batata hai ki kaunsa element animation start karega (iska reference containerRef hai).
//             start: "100 bottom" → Jab element scroll karke bottom se 100px par aayega, tab animation start hoga.
//             end: "center bottom" → Jab element screen ke center tak pahuchega, tab tak animation chalega.
//             toggleActions: "play none none reverse" →
//             play → Jab trigger start ho, tab animation chale.
//             none → Scroll hone ke baad kuch aur na ho.
//             none → Scroll hone ke baad kuch aur na ho.
//             reverse → Agar user scroll wapas upar karega, to animation reverse ho jayega.*/

        //Animation Apply Karna
        titleAnimation.to(
          ".animated-word",
          {
            opacity: 1,
            transform: "translate3d(0, 0, 0) rotateY(0deg) rotateX(0deg)",
            ease: "power2.inOut",
            stagger: 0.02,
          },
          0 //Adding 0 ensures animation starts at the correct time.

          /*👉 Yeh animation .animated-word class wale elements par lagega.
            // 🔹 opacity: 1; → Element fully visible ho jayega.
            // 🔹 transform: "translate3d(0,0,0) rotateY(0deg), rotateX(0deg)";

            // Yeh element ko rotate aur move karega.
            // 🔹 ease: "power1.inOut"; → Smooth animation effect milega.
            // 🔹 stagger: 0.02; → Har element 0.02 second ke gap me animate hoga (Ek ek karke).*/
        );
      }, containerRef);

      return () => ctx.revert(); // Clean up on unmount
    },
    [] //ismein kuch nhi lihne k matlb page intially yh changes perform kare
  );

  return (
    // Jab user scroll karega → containerRef wale element par animation chalega.
    <div ref={containerRef} className={`animated-title ${containerClass}`}>
      {title.split("<br />").map((line, index) => (
        <div
          key={index}
          className="flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3"
        >
          {line.split(" ").map((wrd, i) => (
            <span
              key={i}
              className="animated-word"
              dangerouslySetInnerHTML={{ __html: wrd }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default AnimatedTitle;


//error code
//     const containerRef = useRef(null)
//     useEffect(() => {
//    
//         const cntxt = gsap.context(() => {
//             const titleAnimation = gsap.timeline({
//                 ScrollTrigger: {//s of scroll trigger need to be small
//                     trigger: containerRef.current,
//                     start: "100 bottom",
//                     end: "center bottom",
//                     toggleActions: "play none none reverse"
//                 }
//             })

//             
//             titleAnimation.to('.animated-word', {
//                 opacity: 1,
//                 transform: "translate3d(0,0,0) rotateY(0deg) rotateX(0deg)",
//                 ease: "power2.inOut",
//                 stagger: 0.02
//             })
//             

//         }, containerRef)
//         return () => cntxt.revert()//cleaning useEffect 
//     }, []
//     )