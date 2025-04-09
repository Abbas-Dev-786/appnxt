import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSelector } from 'react-redux'

const Section3 = () => {
  const sliderRef = useRef(null);
  const sliderWrapperRef = useRef(null);

  const slides = useSelector(state => state.SliderDataSlice.data)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const slider = sliderRef.current;
    const sliderWrapper = sliderWrapperRef.current;

    // Get total width of all slider images
    const totalWidth = sliderWrapper.scrollWidth - sliderWrapper.offsetWidth;

    gsap.to(slider, {
      x: -totalWidth,
      ease: "none",
      scrollTrigger: {
        trigger: sliderWrapper,
        start: "-50% bottom",
        end: "bottom top",
        scrub: 1,
        pin: false,
        markers: false,
      }
    });
  }, [slides, sliderRef]);

  return (
    <>
      <div className="body pt-cs" ref={sliderWrapperRef}>
        <div className="slider" ref={sliderRef} style={{display: 'flex', gap: '80px'}}>
          {
            slides?.map((value, index) => (
              <div key={index} className="slider-img" >
                <img src={value.url} alt="" />
              </div>
            ))
          }
          {/* <div className="slider-img">
            <img src="/assets/img/slide-img-2.svg" alt="" />
          </div>
          <div className="slider-img">
            <img src="/assets/img/slide-img-3.svg" alt="" />
          </div>
          <div className="slider-img">
            <img src="/assets/img/slide-img-4.svg" alt="" />
          </div>
          <div className="slider-img">
            <img src="/assets/img/slide-img-5.svg" alt="" />
          </div>
          <div className="slider-img">
            <img src="/assets/img/slide-img-6.svg" alt="" />
          </div>
          <div className="slider-img">
            <img src="/assets/img/slide-img-1.svg" alt="" />
          </div>
          <div className="slider-img">
            <img src="/assets/img/slide-img-2.svg" alt="" />
          </div>
          <div className="slider-img">
            <img src="/assets/img/slide-img-3.svg" alt="" />
          </div>
          <div className="slider-img">
            <img src="/assets/img/slide-img-4.svg" alt="" />
          </div>
          <div className="slider-img">
            <img src="/assets/img/slide-img-5.svg" alt="" />
          </div>
          <div className="slider-img">
            <img src="/assets/img/slide-img-6.svg" alt="" />
          </div> */}
        </div>
      </div>
    </>
  )
}

export default Section3