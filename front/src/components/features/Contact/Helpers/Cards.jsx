import { splitter } from '../../../../util/Splitter'
import { motion, AnimatePresence } from 'framer-motion';

const Cards = ({ flag, heading, location, phone, mail, image }) => {

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: {
                duration: 0.5,
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.5 }
        }
    };

  return (
    <>
        <motion.div
            className="cards"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
        >
            <div className="banner-sec">
                <div className="overlay"></div>
                <img src={image} alt="" />
            </div>
            <AnimatePresence mode="wait">
                <motion.div 
                    key={`${heading}-${location}-${phone}-${mail}`} // Ensure uniqueness by combining multiple props
                    className="content-sec"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="flag">
                        <img src={flag} alt="" />
                    </div>
                    <div className="header">
                        <h4>{splitter(heading, 0, 1)} <span>{splitter(heading, 1)}</span></h4>
                    </div>
                    <div className="content">
                        <div>
                            <i className="fa-solid fa-location-dot" style={{color: '#fff'}} />
                            <p className="font-sm fs-16 text-start">{location}</p>
                        </div>
                        <div>
                            <i className="fa-solid fa-phone" style={{color: '#fff'}} />
                            <p className="font-sm fs-16 text-start">{phone}</p>
                        </div>
                        <div>
                            <i className="fa-solid fa-envelope" style={{color: '#fff'}} />
                            <p className="font-sm fs-16 text-start">{mail}</p>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </motion.div>
    </>
  )
}

export default Cards