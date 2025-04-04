import { NavLink } from 'react-router-dom'

const Part2 = () => {
  return (
    <>
        <div className="part2">
            <div>
                <h4 className="font-sm text-center mb-20">
                    REACH OUT US
                </h4>
                <div className="list">
                    <h4 className="font-md fw-500 fs-42 text-center">
                        (+91) 99300 11856
                    </h4>
                    <h4 className="font-md fw-500 fs-42 text-center">
                        info@appnxt.in
                    </h4>
                </div>
            </div>
            <NavLink to='/contact' className='connect-btn text-deco-none'>Let’s Connect <img src="/assets/img/arrow.svg" alt="" /></NavLink>
        </div>
    </>
  )
}

export default Part2