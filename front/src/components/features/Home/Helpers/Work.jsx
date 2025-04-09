import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSelector } from 'react-redux'
import { splitter } from '../../../../util/Splitter';

const Work = () => {
  const headingRef = useRef(null);
  const contentRef = useRef(null);
  const videoRef = useRef(null);

  const data = useSelector(state => state.AdminDataSlice.whatWeDo)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Heading animation
    if (headingRef.current) {
    //   splitter(headingRef.current);
      
      gsap.fromTo(headingRef.current, {
        opacity: 0,
        y: 50,
        filter: 'blur(10px)'
      }, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.8,
        stagger: 0.05,
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top bottom",
          toggleActions: "play none none reverse"
        }
      });
    }

    // Content stacks animation
    const stacks = contentRef.current.querySelectorAll('.data-stack');
    gsap.fromTo(stacks, {
      opacity: 0,
      x: -50
    }, {
      opacity: 1,
      x: 0,
      duration: 0.8,
      stagger: 0.2,
      scrollTrigger: {
        trigger: contentRef.current,
        start: "top bottom-=100",
        toggleActions: "play none none reverse"
      }
    });

    // Video animation
    gsap.fromTo(videoRef.current, {
      opacity: 0,
      scale: 0.8
    }, {
      opacity: 1,
      scale: 1,
      duration: 1,
      scrollTrigger: {
        trigger: videoRef.current,
        start: "top bottom",
        toggleActions: "play none none reverse"
      }
    });

  }, []);

  return (
    <>
        <div className="container pt-cs">
            <div className="row">
                <div className="col-md-12">
                    <div className="work">
                        <h4 className="font-lg text-start" ref={headingRef}>
                        <span>What We Do</span> <br />
                        Innovation, Collaboration, <span>And</span> Transformation of Ideas
                        </h4>
                        <div className='body'>
                            <div className="content" ref={contentRef}>
                              {
                                data?.map((value, index) => {
                                  const heading = value.head; // e.g., "Full Stack Development"
                                  const lastWordIndex = heading.split(" ").length - 1; // Get the index of the last word
                                  const lastWord = splitter(heading, lastWordIndex, lastWordIndex + 1); // Extract the last word
                                  const mainHeading = splitter(heading, 0, lastWordIndex); // Extract the rest of the heading

                                  return (
                                    <div className="data-stack">
                                        <h4>{mainHeading} <span>{lastWord}</span></h4>
                                        <p className='font-sm'>{value.body}</p>
                                    </div>
                                  )
                                })
                              }
                            </div>
                            <div className="image">
                                <video ref={videoRef} autoPlay loop muted src="/assets/gif/work-img.mp4"></video>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Work