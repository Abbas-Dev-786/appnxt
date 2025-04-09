import { useState } from 'react';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { splitter } from '../../../util/Splitter';

const Header = () => {

    const serviceCategory = useSelector(state => state.ServiceDataSlice.category)
    const services = useSelector(state => state.ServiceDataSlice.data)

    const [isScrolling, setIsScrolling] = useState(false);
    const [serviceLinks, setServiceLinks] = useState([]);
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    const toggleServiceDropdown = () => {
        setDropdownVisible(!isDropdownVisible);
    };

    // useEffect(() => {
    //     console.log(isDropdownVisible)
    // },[isDropdownVisible])

    const toggleServiceLinks = (category) => {
        // console.log(category)
        setServiceLinks(services?.filter(value => value.link.category === category))
    }

    useEffect(()=>{console.log(serviceLinks)}, [serviceLinks])

    useEffect(() => {
        const handleScroll = () => {
        setIsScrolling(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    const headerStyle = isScrolling
        ? { backgroundColor: "#000", transition: "background-color 0.10s ease", position: 'sticky', top: 0, zIndex: 999999999999 }
        : {position: 'sticky', top: 0, zIndex: 999999999999};

        const toggleMenu = (open) => {
            document.getElementById('slider-menu').style.right = `${open ? 0 : -100}%`
            document.getElementById('root').style.overflowY = `${open ? 'hidden' : 'auto'}`;
            document.getElementById('root').style.height = `${open ? '100vh' : 'auto'}`;

        }

        const toggleDropdown = (open) => {
            document.getElementById('dropdown-menu').style.opacity = `${open ? 1 : 0}`;
            document.getElementById('dropdown-menu').style.transform = `${open ? 'translateY(0)' : 'translateY(-200%)'}`;
            !open && setServiceLinks('webAppDev')
        }

    return (
        <header style={headerStyle}>
            <div className="container">
                <div className="main-header">
                    <NavLink to='/'>
                        <img className="logo" src="/assets/img/logo.svg" alt="" />
                    </NavLink>
                    {
                        window.innerWidth > 767 ? (
                            <ul className='menu-list'>
                                <li>
                                    <NavLink to='/'>Home</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/about'>About Us</NavLink> 
                                </li>
                                <li onMouseEnter={()=>  toggleDropdown(true)} onMouseLeave={()=>toggleDropdown(false)} className="drop-down">
                                    <NavLink to='/services'>Services &nbsp; <i class="fa-regular fa-angle-down"></i></NavLink>
                                    <div id='dropdown-menu' className="dropdown-menu">
                                        <div className="part1">
                                            <ul>
                                                <li className='opacity-5 cs'>Main category</li>
                                                {
                                                    serviceCategory?.map((value, index) => {
                                                        const heading = value; // e.g., "Full Stack Development"
                                                        const lastWordIndex = heading.split(" ").length - 1; // Get the index of the last word
                                                        const lastWord = splitter(heading, lastWordIndex, lastWordIndex + 1); // Extract the last word
                                                        const mainHeading = splitter(heading, 0, lastWordIndex);
                                                        return (
                                                            <li key={index} onMouseEnter={()=>toggleServiceLinks(value)} onClick={()=>toggleServiceLinks(value)}><h4>{mainHeading} <span>{lastWord}</span></h4></li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                        </div>
                                        <div className="part2">
                                            <ul>
                                                <li className='opacity-5'>Browse by category</li>
                                                {
                                                    Array.isArray(serviceLinks) && serviceLinks.length > 0 && serviceLinks.map((item, index) => (
                                                        <li key={index}><NavLink to={`/service/${item._id}`}>{item.heading}</NavLink></li>
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <NavLink to='/projects'>Projects</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/digital-banking-solutions'>Digital Banking Solutions</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/cyber-security'>Cyber Security</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/contact' className="connect-btn">Contact Us <img src="/assets/img/arrow.svg" alt="" /></NavLink>
                                </li>
                            </ul>
                        ) : (
                            <div>
                                <button id="menubtn" onClick={()=>toggleMenu(true)} className="menu-btn">
                                    <div className="line-1"></div>
                                    <div className="line-2"></div>
                                </button>
                            </div>
                        )
                    }
                    
                    
                </div>
                <div id="slider-menu" className="slider-menu">
                    <div className="header">
                        <div className='part-1'>
                            <div className='text'>
                                <p>CALL US</p>
                                <h6>(+91) 99300 11856</h6>
                            </div>
                            <div className='text'>
                                <p>EMAIL US</p>
                                <h6>info@appnxt.in</h6>
                            </div>
                        </div>
                        <div className="main-header p-0">
                            <button id="menubtn" onClick={() => toggleMenu(false)} className="menu-btn cross">
                                <div className="line-1"></div>
                                <div className="line-2"></div>
                            </button>
                        </div>
                    </div>
                    <div className="body">
                        <img className='gif' src="/assets/img/slider.svg" alt="" />
                        <NavLink to='/about'>About Us</NavLink>
                        <div className="service-dropdown">
                            <h5 className='cs' onClick={toggleServiceDropdown}>Services <i className="fa-solid fa-sm fa-angle-down"></i></h5>
                            {isDropdownVisible && (
                                <div className="mob-dropdown-menu">
                                    <div className="part1">
                                        <ul>
                                            <li onClick={() => setServiceLinks('webAppDev')}><h4>Web App <span>Development</span></h4></li>
                                            <li onClick={() => setServiceLinks('enterpriseMessaging')}><h4>Enterprise <span>Messaging </span></h4></li>
                                            <li onClick={() => setServiceLinks('smartCards')}><h4>Smart <span>Cards</span></h4></li>
                                            <li onClick={() => setServiceLinks('mobileAppDev')}><h4>Mobile App <span>Development</span></h4></li>
                                            <li onClick={() => setServiceLinks('brandingAndMarketing')}><h4>Branding and Marketing <span>Solutions</span></h4></li>
                                        </ul>
                                    </div>
                                    <div className="part2">
                                        <ul>
                                            <li className='opacity-5'>Browse by category</li>
                                            {services?.[serviceLinks]?.map((item, index) => (
                                                <li key={index}><NavLink to={"/"}>{item.name}</NavLink></li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </div>
                        <NavLink to='/projects'>Projects</NavLink>
                        <NavLink to='/digital-banking-solutions'>Digital Banking Solutions</NavLink>
                        <NavLink to='/cyber-security'>Cyber Security</NavLink>
                        {/* <NavLink to='/'>Awards</NavLink>
                        <NavLink to='/'>Members</NavLink> */}
                        <NavLink to='/contact'>Contact Us</NavLink>
                    </div>
                    <div className="footer">
                        <NavLink to='/' className='font-md'>TW</NavLink>
                        <NavLink to='/' className='font-md'>FB</NavLink>
                        <NavLink to='/' className='font-md'>YT</NavLink>
                        <NavLink to='/' className='font-md'>BE</NavLink>
                        <NavLink to='/' className='font-md'>DR</NavLink>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
