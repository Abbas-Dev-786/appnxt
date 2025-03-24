import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import splitTextIntoSpans from '../../../util/split';

const TechStack = () => {
    const headingRef = useRef(null);
    const webRef = useRef([]);
    const imagesRef = useRef([]);
    const techBodyRef = useRef(null);

    const addToWebRef = (el) => {
        if (el && !webRef.current.includes(el)) {
            webRef.current.push(el);
        }
    };

    const addToImagesRef = (el) => {
        if (el && !imagesRef.current.includes(el)) {
            imagesRef.current.push(el);
        }
    };

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (headingRef.current) {
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

        const mainTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: techBodyRef.current,
                start: "top 30%",
                toggleActions: "play none none reverse",
                markers: false,
            }
        });

        if(webRef.current.length > 0){
            mainTimeline.fromTo(webRef.current, {
                yPercent: 100,
            }, {
                yPercent: 0,
                duration: 0.8,
                stagger: 0.2
            });
        }

        if(imagesRef.current.length > 0){
            mainTimeline.fromTo(imagesRef.current, {
                opacity: 1,
                scaleX: 0
            }, {
                opacity: 1,
                scaleX: 1,
                duration: 0.8,
                stagger: 0.2
            }, "-=0.4");
        }
     
    }, []);

    // Function to generate random position and rotation
    const getRandomStyle = () => {
        const randomBottom = Math.floor(Math.random() * 100) + 'px';
        const randomRight = Math.floor(Math.random() * 100) + 'px';
        const randomRotation = Math.floor(Math.random() * 360) + 'deg';
        return { bottom: randomBottom, right: randomRight };
    };

    const Desktop = () => {
        return (
            <div className="container pt-cs">
                <div className="row">
                    <div className="col-md-12">
                        <div className="tech-stack">
                            <div className="head">
                                <h4 className="font-lg" ref={headingRef}>
                                    <span>Our Fort Of</span> <br />
                                    The Technology Stack
                                </h4>
                            </div>
                            <div className="tech-body" ref={techBodyRef}>
                                <div className="area">
                                    <div className="one position-rel">
                                        <h4 ref={addToWebRef}>WEB</h4>
                                        <div className="pill" style={getRandomStyle()}>
                                            Java
                                        </div>
                                    </div>
                                    <div className="one eq">
                                        <img ref={addToImagesRef} src="/assets/img/tech-img1.svg" alt="" />
                                    </div>
                                    <div className="one lg position-rel">
                                        <h4 ref={addToWebRef}>Smart Card</h4>
                                        <div className="pill" style={getRandomStyle()}>
                                        Magento
                                        </div>
                                    </div>
                                </div>
                                <div className="area">
                                    <div className="two eq position-rel">
                                        <h4 ref={addToWebRef}>Digital Banking Solutions</h4>
                                        <div className="pill" style={getRandomStyle()}>
                                        AngularJS
                                        </div>
                                    </div>
                                </div>
                                <div className="area">
                                    <div className="two eq position-rel">
                                        <h4 ref={addToWebRef}>MOBILE</h4>
                                        <div className="pill" style={getRandomStyle()}>
                                        AngularJS
                                        </div>
                                    </div>
                                    <div className="two eq">
                                        <img ref={addToImagesRef} src="/assets/img/tech-img2.svg" alt="" />
                                    </div>
                                    <div className="two lg position-rel">
                                        <h4 ref={addToWebRef}>Enterprise</h4>
                                        <div className="pill" style={getRandomStyle()}>
                                        Android
                                        </div>
                                    </div>
                                </div>
                                <div className="area cs-gtc">
                                    <div className="three lg position-rel">
                                        <h4 ref={addToWebRef}>Messaging</h4>
                                        <div className="pill" style={getRandomStyle()}>
                                        Drupal
                                        </div>
                                    </div>
                                    <div className="three eq">
                                        <img ref={addToImagesRef} src="/assets/img/tech-img3.svg" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const Mobile = () => {
        return (
            <div className="container pt-cs">
                <div className="row">
                    <div className="col-md-12">
                        <div className="tech-stack-mob">
                            <div className="head">
                                <h4 className="font-lg" ref={headingRef}>
                                    <span>Our Fort Of</span> <br />
                                    The Technology Stack
                                </h4>
                            </div>
                            <div className="tech-body">
                                <div className="area">
                                    <div className="one position-rel">
                                        <h4 ref={addToWebRef}>WEB</h4>
                                        <div className="pill" style={getRandomStyle()}>
                                            Java
                                        </div>
                                    </div>
                                    <div className="one eq">
                                        <img ref={addToImagesRef} src="/assets/img/tech-img1.svg" alt="" />
                                    </div>
                                    <div className="one lg">
                                        <h4 ref={addToWebRef}>E-COMMERCE</h4>
                                    </div>
                                </div>
                                <div className="area">
                                    <div className="two eq">
                                        <h4 ref={addToWebRef}>MOBILE</h4>
                                    </div>
                                    <div className="two eq">
                                        <img ref={addToImagesRef} src="/assets/img/tech-img2.svg" alt="" />
                                    </div>
                                    <div className="two lg">
                                        <h4 ref={addToWebRef}>CMS</h4>
                                    </div>
                                </div>
                                <div className="area cs-gtc">
                                    <div className="three lg">
                                        <h4 ref={addToWebRef}>JAVASCRIPT</h4>
                                    </div>
                                    <div className="three eq">
                                        <img ref={addToImagesRef} src="/assets/img/tech-img3.svg" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            {
                window.innerWidth >= 767 ? (<Desktop />) : (<Mobile />)
            }
        </>
    )
}

export default TechStack