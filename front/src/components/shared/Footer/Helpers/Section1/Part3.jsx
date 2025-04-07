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
                    <a className='font-sm text-end fs-16' href='https://www.instagram.com/appnxt.in' target="_blank">
                        {!mobile && <img src="/assets/img/arrow.svg" alt="" />} &nbsp; INSTAGRAM &nbsp;
                        {mobile && <img src="/assets/img/arrow.svg" alt="" />}
                    </a>
                    <a className='font-sm text-end fs-16' href='https://in.pinterest.com/appnxt_' target="_blank">
                        {!mobile && <img src="/assets/img/arrow.svg" alt="" />} &nbsp; PINTEREST &nbsp;
                        {mobile && <img src="/assets/img/arrow.svg" alt="" />}
                    </a>
                    <a className='font-sm text-end fs-16' href='https://x.com/Appnxt_' target="_blank">
                        {!mobile && <img src="/assets/img/arrow.svg" alt="" />} &nbsp; TWITTER &nbsp;
                        {mobile && <img src="/assets/img/arrow.svg" alt="" />}
                    </a>
                </div>
            </div>
            <p className={`font-sm fs-16 ${!mobile ? 'text-end' : 'text-start'}`}>Terms & Condition &nbsp; | &nbsp; Privacy Policy</p>
        </div>
    </>
  )
}

export default Part3