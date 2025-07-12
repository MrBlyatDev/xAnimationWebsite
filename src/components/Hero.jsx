import { useGSAP } from "@gsap/react"
import { SplitText } from "gsap/all"
import gsap from "gsap";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";

const Hero = () => {
  const videoRef = useRef();
  const isMobile = useMediaQuery({maxWidth: 777});
  
  useGSAP(() => {
    const heroSplit = new SplitText('.title', { type: 'chars, words' });
    const paragraphSplit = new SplitText('.subtitle', { type: 'lines' });

    heroSplit.chars.forEach((char) => char.classList.add('text-gradient'));

    gsap.from(heroSplit.chars, {
      yPercent: 100,
      duration: 2,
      ease: 'expo.out',
      stagger: 0.07,
    })

    gsap.from(paragraphSplit.lines, {
      opacity: 0,
      yPercent: 100,
      duration: 2,
      ease: 'expo.out',
      stagger: 0.07,
      delay: 1,
    })

    gsap.timeline({
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    })
    .to('.left-leaf', { y: 300 }, 0)
    .to('.right-leaf', { y: -300 }, 0)

    const startValue = isMobile ? 'top 50%' : 'center 60%';
    const endValue = isMobile ? '120% top' : 'bottom top';

    const timelineRef = gsap.timeline({
      scrollTrigger: {
        trigger: 'video',
        start: startValue,
        end: endValue,
        scrub: true,
        pin: true,
      }
    });

    videoRef.current.onloadedmetadata = () => {
      timelineRef.to(videoRef.current, {
        currentTime: videoRef.current.duration,
        ease: 'none',
        duration: videoRef.current.duration,
      });
    }
  });
  
  return (
    <>
      
      <section id="hero" className='noisy'>

        <h1 className="title">MOJITO</h1>
        <img src="./images/hero-left-leaf.png" alt="left-leaf" className="left-leaf"/>
        <img src="./images/hero-right-leaf.png" alt="right-leaf" className="right-leaf"/>

        <div className="body">
          <div className="content">

            <div className="space-y-5 hidden md:block">
              <p>Cool. Crips. Classic.</p>
              <p className="subtitle">Sip the Spirit <br/> of Summer </p>
            </div>
          
            <div className="view-cocktails">
              <p className="subtitle">Every Cocktail on our menu is a blend of premium ingredients, 
                creative flair, and timeless recipes - designed to delight your senses.
              </p>
              <a href="#cocktails">View Coctails</a>
            </div>
          
          </div>
        </div>
      
      </section>

      <section className="video absolute inset-0">
        <video 
        ref={videoRef} 
        src="../public/videos/output.mp4"
        muted
        playsInline
        preload="auto"
        />
      </section>

    </>
  )
}

export default Hero