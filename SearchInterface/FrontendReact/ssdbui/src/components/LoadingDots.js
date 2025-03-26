import React from "react";
import {easeInOut, motion} from 'framer-motion';
import './LoadingDots.css';


const cirVariants = {
    start: {
      y: "0px",
    },
    end: {
      y: "20px",
      transition: {
        duration: 0.5,
        ease: easeInOut,
        repeat: Infinity,
        repeatType: "reverse",
      },
    },
  };//framer motion variants for the circles


const conVariants = {
    start: {
        transition: {
            staggerChildren: 0.07,
        }
    },
    end: {
        transition:{
            staggerChildren: 0.07,
        }
    }

}; //framer motion variants for the container to be able to stagger the circles


function LoadingDots () {
return(
    <motion.div 
    className="loading-container"
    variants={conVariants} 
    initial="start"
    animate="end"
    >

        <motion.span className="loading-dots" variants={cirVariants} ></motion.span>
        <motion.span className="loading-dots" variants={cirVariants} ></motion.span>
        <motion.span className="loading-dots" variants={cirVariants} ></motion.span>

    </motion.div>
)


}

export default LoadingDots;