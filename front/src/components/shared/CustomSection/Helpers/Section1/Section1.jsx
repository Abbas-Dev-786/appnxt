import { useState, useRef, useEffect } from "react";
import Part1 from "./Part1";
import Part2 from "./Part2";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import splitTextIntoSpans from '../../../../../util/split';
import { useSelector } from 'react-redux'

const Section1 = () => {
  
  const rawData = useSelector(state => state.WorkProcessDataSlice.data)
  const { description } = rawData

  const [currentStep, setCurrentStep] = useState({});
  const [data, setData] = useState([]);

  const headingRef = useRef(null);
  const descriptionRef = useRef(null);

  const setStepSelection = (value) => {
    setCurrentStep(value);
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (headingRef.current) {
      // splitTextIntoSpans(headingRef.current);
      
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

    if (descriptionRef.current) {
      gsap.fromTo(descriptionRef.current, {
        opacity: 0,
        y: 50
      }, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: descriptionRef.current,
          start: "top bottom",
          toggleActions: "play none none reverse"
        }
      });
    }
  }, []);

  useEffect(() => {
    if (rawData) {
      const { step1, step2, step3, step4 } = rawData;

      // Add step field to each step object
      const formattedData = [
        { ...step1, step: "Step 1" },
        { ...step2, step: "Step 2" },
        { ...step3, step: "Step 3" },
        { ...step4, step: "Step 4" },
      ];

      setCurrentStep(formattedData[0]); // Set initial step to step1
      setData(formattedData); // Set data to the formatted array
    }
  }, [rawData]);


  return (
    <>
      <div className="header">
        <h4 className="font-lg text-start" ref={headingRef}>
          <span>We Follow</span> <br />
          Our Work Process
        </h4>

        <p className="font-sm text-start" ref={descriptionRef}>
          Enthusiastically engage cross-media leadership skills for alternative
          <br />
          experiences. Proactively drive vertical systems than intuitive
          architectures.
        </p>
      </div>
      <div className="body">
        <Part1 stepSelection={currentStep} />
        <Part2
          handleStepSelection={setStepSelection}
          currentStep={currentStep}
          data={data}
        />
      </div>
    </>
  );
};

export default Section1;
