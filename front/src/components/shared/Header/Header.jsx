import { useState } from 'react';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom'

const Header = () => {

    const [isScrolling, setIsScrolling] = useState(false);
    const [serviceLinks, setServiceLinks] = useState('webAppDev');
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    const toggleServiceDropdown = () => {
        setDropdownVisible(!isDropdownVisible);
    };

    // useEffect(() => {
    //     console.log(isDropdownVisible)
    // },[isDropdownVisible])

    const services = {
        webAppDev : [
            {
                name: 'PHP Development',
                link: '/php-development'
            },
            {
                name: 'Laravel Developrnent',
                link: '/laravel-development'
            },
            {
                name: 'Java Development',
                link: '/java-development'
            },
            {
                name: 'Python Development',
                link: '/python-development'
            },
            {
                name: 'Angular Development',
                link: '/angular-development'
            },
            {
                name: 'Vue Js Development',
                link: '/vue-development'
            },
            {
                name: 'Node Js Development',
                link: '/node-development'
            },
            {
                name: 'React Js Development',
                link: '/react-development'
            },
        ],
        enterpriseMessaging : [
            {
                name: 'A2P Messaging',
                link: '/a2p-messaging'
            },
            {
                name: '2 Way Messaging',
                link: '/2-way-messaging'
            },
            {
                name: 'RCS Business Messaging',
                link: '/rcs-business-messaging'
            },
            {
                name: 'Whatsapp Business Platform',
                link: '/whatsapp-business-platform'
            },
            {
                name: 'Google Business Messages',
                link: '/google-business-messages'
            },
            {
                name: 'Verified Messages',
                link: '/verified-messages'
            },
            {
                name: 'Truecaller Verified Business Identity',
                link: '/truecaller-verified-business-identity'
            },
            {
                name: 'Solutions',
                link: '/solutions'
            },
            {
                name: 'VoiceEX - A suite of Cloud Telephony Solutions',
                link: '/voiceex-cloud-telephony'
            }
        ],
        smartCards : [
            {
                name: 'Markets',
                link: '/markets'
            },
            {
                name: 'Data',
                link: '/data'
            },
            {
                name: 'Products',
                link: '/products'
            },
            {
                name: 'Personalization',
                link: '/personalization'
            },
            {
                name: 'Digital',
                link: '/digital'
            },
            {
                name: 'CMS',
                link: '/cms'
            }
        ],
        mobileAppDev : [
            {
                name: 'Flutter App Development',
                link: '/mob-app-development'
            },
            {
                name: 'Android App Development',
                link: '/mob-app-development'
            },
            {
                name: 'IOS App Development',
                link: '/mob-app-development'
            },
            {
                name: 'React Native App Development',
                link: '/mob-app-development'
            },
        ],
        brandingAndMarketing : [
            {
                name: 'Brand Identity',
                link: '/brand-identity'
            },
            {
                name: 'SMM - Social Media Marketing',
                link: '/smm-social-media-marketing'
            },
            {
                name: 'SEO',
                link: '/seo'
            },
            {
                name: 'Meta Ads',
                link: '/meta-ads'
            },
            {
                name: 'Google Ads',
                link: '/google-ads'
            },
            {
                name: 'UI/UX',
                link: '/ui-ux'
            }
        ],
    }

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
                                                <li onMouseEnter={()=>setServiceLinks('webAppDev')} onClick={()=>setServiceLinks('webAppDev')}><h4>Web App <span>Development</span></h4></li>
                                                <li onMouseEnter={()=>setServiceLinks('enterpriseMessaging')} onClick={()=>setServiceLinks('enterpriseMessaging')}><h4>Enterprise <span>Messaging </span></h4></li>
                                                <li onMouseEnter={()=>setServiceLinks('smartCards')} onClick={()=>setServiceLinks('smartCards')}><h4>Smart  <span>Cards</span></h4></li>
                                                <li onMouseEnter={()=>setServiceLinks('mobileAppDev')} onClick={()=>setServiceLinks('mobileAppDev')}><h4>Mobile App <span>Development</span></h4></li>
                                                <li onMouseEnter={()=>setServiceLinks('brandingAndMarketing')} onClick={()=>setServiceLinks('brandingAndMarketing')}><h4>Branding and Marketing <span>Solutions</span></h4></li>
                                            </ul>
                                        </div>
                                        <div className="part2">
                                            <ul>
                                                <li className='opacity-5'>Browse by category</li>
                                                {
                                                    services?.[serviceLinks]?.map((item, index) => (
                                                        <li key={index}><NavLink to={item.link}>{item.name}</NavLink></li>
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
