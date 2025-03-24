import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import splitTextIntoSpans from '../../../../util/split';

const Work = () => {
  const headingRef = useRef(null);
  const contentRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Heading animation
    if (headingRef.current) {
    //   splitTextIntoSpans(headingRef.current);
      
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
                        Innovation, Collaboration, <span>And</span> Transformation Ideas
                        </h4>
                        <div className='body'>
                            <div className="content" ref={contentRef}>
                                <div className="data-stack">
                                    <h4>Full Stack <span>Development</span></h4>
                                    <p className='font-sm'>Full Stack Development offering a plethora of custom web development solutions by experienced website development company with out-of-box approach.</p>
                                </div>
                                <div className="data-stack">
                                    <h4>Mobile Application <span>Development</span></h4>
                                    <p className='font-sm'>Best in class, well-structured iOS, and Android App Development backed with cutting-edge technology embellishing Modern Technology UX.</p>
                                </div>
                                <div className="data-stack">
                                    <h4>Digital Banking <span>Solution</span></h4>
                                    <p className='font-sm'>A digital banking solution refers to a comprehensive platform or system that enables financial institutions to provide banking services through digital channels such as mobile apps, web applications, and APIs.</p>
                                </div>
                                <div className="data-stack">
                                    <h4>Web App <span>Designing</span></h4>
                                    <p className='font-sm'>Our web & app development and designing services ensure high product functionality & design that allows much easier User Experience.</p>
                                </div>
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