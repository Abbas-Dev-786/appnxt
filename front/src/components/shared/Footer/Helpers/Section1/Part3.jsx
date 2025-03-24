import { NavLink } from 'react-router-dom'

const Part3 = ({mobile}) => {
  return (
    <>
        <div className="part3">
            <div>
                <h4 className={`font-sm mb-20 text-end `}>
                    COMPANY
                </h4>
                <div className="list">
                    <NavLink className='font-sm text-end fs-16' to='/'>
                        {!mobile && <img src="/assets/img/arrow.svg" alt="" />} &nbsp; INSTAGRAM &nbsp;
                        {mobile && <img src="/assets/img/arrow.svg" alt="" />}
                    </NavLink>
                    <NavLink className='font-sm text-end fs-16' to='/'>
                        {!mobile && <img src="/assets/img/arrow.svg" alt="" />} &nbsp; TWITTER &nbsp;
                        {mobile && <img src="/assets/img/arrow.svg" alt="" />}
                    </NavLink>
                    <NavLink className='font-sm text-end fs-16' to='/'>
                        {!mobile && <img src="/assets/img/arrow.svg" alt="" />} &nbsp; FACEBOOK &nbsp;
                        {mobile && <img src="/assets/img/arrow.svg" alt="" />}
                    </NavLink>
                    <NavLink className='font-sm text-end fs-16' to='/'>
                        {!mobile && <img src="/assets/img/arrow.svg" alt="" />} &nbsp; DRIBBBLE &nbsp;
                        {mobile && <img src="/assets/img/arrow.svg" alt="" />}
                    </NavLink>
                </div>
            </div>
            <p className={`font-sm fs-16 ${!mobile ? 'text-end' : 'text-start'}`}>Terms & Condition &nbsp; | &nbsp; Privacy Policy</p>
        </div>
    </>
  )
}

export default Part3