import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import Card from './Card';

const Slider = () => {

    const cardContent = [
        {
            heading: "About Company",
            description: "Founded in 2017, APPNXT PVT. LTD. specializes in website and mobile app development, digital marketing, graphic design, CRM, ERP, MLM, and software solutions. Our team of 20+ experienced professionals delivers customized, innovative solutions that help businesses succeed by boosting traffic, generating conversions, and aligning companies with the latest technologies for growth and success.",
            button: "Know More",
            image: "/assets/img/stack-img-1.svg"
        },
        {
            heading: "Our Mission",
            description: "Our goal is to provide high-quality, cost-effective IT solutions that earn client trust. We maintain professional standards and business ethics, respond swiftly to changing client needs, and continuously improve our services. By fostering long-term relationships, we aim to ensure ongoing client satisfaction and support their success through innovative, tailored solutions that evolve with their business requirements.",
            button: "Let’s Connect",
            image: "/assets/img/stack-img-2.svg"
        },
        {
            heading: "About Vision",
            description: "Our aim is to establish ourselves as a benchmark in delivering premium-quality IT solutions, setting high standards for excellence. With a reputation for commitment and passion, we focus on providing exceptional customer service. We strive to exceed client expectations, consistently offering innovative and reliable solutions that meet their needs and ensure long-term satisfaction and success.",
            button: "Know More",
            image: "/assets/img/stack-img-3.svg"
        }
    ]


  return (
    <>
        <div className="container pt-cs">
            <div className="stack-card">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card-cs">
                            <Swiper
                            modules={[Navigation]}
                            // navigation={true}
                            slidesPerView={1}
                            spaceBetween={30}
                            className="mySwiper"
                            >
                                {
                                    cardContent?.map((value, index) => (
                                        <SwiperSlide>
                                            <Card heading={value.heading} description={value.description} button={value.button} image={value.image} type={'mob'} />
                                        </SwiperSlide>
                                    ))
                                }
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Slider