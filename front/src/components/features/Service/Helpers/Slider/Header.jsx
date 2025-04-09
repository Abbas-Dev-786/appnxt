import { splitter } from "../../../../../util/Splitter"

const Header = ({ heading, description }) => {
  return (
    <> 
        <div className="header">
            <div className="content">
                <div>
                    <img src="/assets/img/vertical-line.svg" alt="" />
                </div>
                <div>
                    <h4 className="font-lg text-start">
                        <span>{splitter(heading, 0, 2)}</span> {splitter(heading, 2)}
                    </h4>
                    <p className="font-sm text-start">{description}</p>
                </div>
            </div>
            <div className="arrow-button">
                <button><i class="fa-solid fa-xl fa-arrow-left" style={{color: '#fff'}} /></button>
                <button><i class="fa-solid fa-xl fa-arrow-right" style={{color: '#fff'}} /></button>
            </div>
        </div>
    </>
  )
}

export default Header