import Footer from "../../shared/Footer/Footer";
import Header from "../../shared/Header/Header";
import { useParams } from "react-router-dom";
import Topic from "./Helpers/Topic";
import HeadingStart from "../../shared/HeadingStyles/HeadingStart";
import Content from '../../shared/Content/Content'
import Projects from "../../shared/Projects/Projects";
import Advertise from "./Helpers/Advertise";
import { useScrollToTop } from "../../../util/scrollHook";
import { useSelector } from 'react-redux'
import { useState } from "react";
import { useEffect } from "react";
import { splitter } from "../../../util/Splitter";

const Inner = () => {
    const { project } = useParams();

    const allProjects = useSelector(state => state.ProjectDataSlice.data)

    const [displayProject, setDisplayProject] = useState([])
    const [displayData, setDisplayData] = useState({})

    const projectContent = {
        normal: "More Projects",
        normalSize: window.innerWidth >= 767 ? 78 : 55,
        highlight: "Explore Our",
        highlightSize: window.innerWidth >= 767 ? 88 : 55,
        width: window.innerWidth >= 767 ? 50 : 100
    }

    useEffect(()=>{
        if(allProjects && allProjects?.length > 0) {
            const filteredProj = allProjects?.find(proj => proj._id === project)
            const { banners, content } = filteredProj
            const combinedArray = [...Array(Math.max(banners.length, content.length))].reduce((acc, _, index) => {
                if (index < banners.length) {
                    acc.push({ type: 'banner', data: banners[index] });
                }
                if (index < content.length) {
                    acc.push({ type: 'content', data: content[index] });
                }
                return acc;
            }, []);
            setDisplayData(combinedArray)
            // console.log(combinedArray)
            setDisplayProject(filteredProj)
        }
    }, [allProjects])


    useScrollToTop()

    return (
        <>
            <Header />

            <Topic project={displayProject?.name} />

            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-12">
                        <HeadingStart highlight={splitter(displayProject?.heading, 0, 3)} normal={splitter(displayProject?.heading, 3)} normalSize={window.innerWidth >= 767 ? 78 : 40} highlightSize={window.innerWidth >= 767 ? 88 : 45} width={window.innerWidth >= 767 ? 90 : 100} />
                    </div>
                </div>
            </div>

            {displayData && displayData?.length > 0 && displayData?.map((item, index) => {
                if (item.type === 'banner') {
                    return (
                    <div className="pt-5" key={index}>
                        <Advertise 
                        img={item.data.s3Url} 
                        bg='244F99' 
                        padding={0} 
                        imgHeight={window.innerWidth >= 767 ? 650 : 300} 
                        objectFit={'cover'} 
                        />
                    </div>
                    );
                } else if (item.type === 'content') {
                    return (
                    <Content 
                        key={index} 
                        heading={item.data.head} 
                        content={item.data.body} 
                    />
                    );
                }
                return null; // Fallback in case of unexpected type
            })}

            {/* <div className="pt-5">
                <Advertise img={'/assets/img/portfolio-img-1.svg'} bg={'244F99'} padding={20} imgHeight={window.innerWidth >= 767 ? 650 : 300} objectFit={'contain'} />
            </div>

            <Content heading={'The Objective'} content={'Spice Money aims to bridge the financial inclusion gap in rural India by providing accessible and secure digital financial services.'}/>

            <div className="pt-cs">
                <Advertise img={'/assets/img/portfolio-img-2.svg'} bg={'DD2928'} padding={15} imgHeight={window.innerWidth >= 767 ? 600 : 300} objectFit={'contain'} />
            </div>

            <Content heading={'Solution'} content={'AppNxt developed a comprehensive digital platform for Spice Money, enabling seamless transactions and services for rural customers.'} />

            <div className="pt-cs">
                <Advertise img={'/assets/img/portfolio-img-3.svg'} bg={'244F99'} padding={0} imgHeight={window.innerWidth >= 767 ? 960 : 400} objectFit={'cover'} />
            </div>

            <Content heading={'Results'} content={'The platform has successfully onboarded over 1.4 million Adhikaris (agents) across 18,900+ pincodes, covering 95% of rural India, and serving over 150 million customers.'} />
            
            <div className="pt-cs">
                <Advertise img={'/assets/img/portfolio-img-4.svg'} bg={'DD2928'} padding={15} imgHeight={window.innerWidth >= 767 ? 380 : 115} objectFit={window.innerWidth >= 767 ? 'contain' : 'cover'} />
            </div> */}

            <Projects type={'start'} content={projectContent} />

            <Footer />
        </>
    );
};

export default Inner;
