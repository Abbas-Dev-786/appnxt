import { useScrollToTop } from "../../../util/scrollHook";
import { useParams } from "react-router-dom";
import AnimateImage from "../../shared/AnimateImage/AnimateImage";
import Banner from "../../shared/Banner/Banner";
import Content from "../../shared/Content/Content";
import CustomSection from "../../shared/CustomSection/CustomSection";
import Footer from "../../shared/Footer/Footer";
import Header from "../../shared/Header/Header";
import TechStack from "../../shared/Technology/TechStack";
import Development from "./Helpers/Developments/Development";
import Slider from "./Helpers/Slider/Slider";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";

const Service = () => {
  const param = useParams();
  const { slug } = param;

  const bannerHeading = useSelector((state) => state.bannerDataSlice?.data);

  const services = useSelector((state) => state.ServiceDataSlice?.data);

  const [displayData, setDisplayData] = useState({});

  useEffect(() => {
    if (services && slug) {
      setDisplayData(services?.find((value) => value.link?.url === slug));
    }
  }, [services, slug]);

  const content = {
    heading: `PHP Development Service`,
    content: `APPNXT PVT. LTD. is a leading custom software development firm, specializing in tailored solutions that seamlessly fit your enterprise needs, Our skilled engineers stay ahead of emerging technologies, frameworks, and trends, ensuring top-quality products and services, With a commitment to functionality and robustness, we deliver reliable, custom development solutions that align with your vision.`,
  };

  useScrollToTop();

  return (
    <>
      <Header />

      <Banner
        heading={displayData?.heading}
        content={displayData?.description}
        bgURL={
          bannerHeading?.data?.bannerImg?.s3Url ||
          `/assets/img/service-banner.svg`
        }
      />

      <Content
        heading={displayData?.content?.heading}
        content={displayData?.content?.description}
      />

      <AnimateImage image={displayData?.banner?.s3Url} />

      <Slider slider={displayData?.slider} />

      <Development />

      <TechStack />

      <CustomSection hide={"top"} />

      <Footer />
    </>
  );
};

export default Service;
