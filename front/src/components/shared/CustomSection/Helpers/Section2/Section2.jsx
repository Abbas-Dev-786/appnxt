import Part2 from "./Part2"
import Part1 from "./Part1"
import Counter from "../../../Counter/Counter"
import { useState } from "react"
import { useEffect } from "react"
import { useSelector } from 'react-redux'

const Section2 = () => {

  const counter = useSelector(state => state.AdminDataSlice.counter)
  const [counters, setCounters] = useState([
    { value: 12, suffix: "+", label: "Years of Excellence", code: 'YE' },
    { value: 500, suffix: "+", label: "Satisfied Clients", code: 'SC' },
    { value: 700, suffix: "+", label: "Projects Delivered", code: 'PD' },
    { value: 10, suffix: "+", label: "Industry Recognitions", code: 'IR' },
  ])

  useEffect(() => {
    if (counter) {
      const updatedCounters = counters.map(item => {
        if (item.code in counter) { 
          return { ...item, value: counter[item.code] }; 
        }
        return item; 
      });
      setCounters(updatedCounters); 
    }
  }, [counter]);


  return (
    <>
        <div className="container pt-cs">
            <div className="row">
                <div className="col-md-12">
                  <div className="body">
                    <Part1 />
                    <Part2 />
                  </div>
                  <Counter counters={counters} />
                </div>
            </div>
        </div>
    </>
  )
}

export default Section2