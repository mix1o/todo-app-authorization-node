import React from 'react';
import { motion } from 'framer-motion';

const CircleWrapper = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
};

const LoadingWrapperVariants = {
  start: {
    transition: {
      staggerChildren: 0.1,
    },
  },
  end: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const LoadingCircleVariants = {
  start: {
    y: '0%',
  },
  end: {
    y: '100%',
  },
};

const LoadingCircleTransitione = {
  duration: 0.4,
  yoyo: Infinity,
  ease: 'easeInOut',
};

const BasicLoadingAni = () => {
  return (
    <>
      <motion.div
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'var( --secondary-grey)',
        }}
        variants={LoadingWrapperVariants}
        initial="start"
        animate="end"
      >
        <p
          style={{
            marginBottom: '3rem',
            fontSize: '3rem',
            fontWeight: 700,
            color: 'var(--white)',
          }}
        >
          <span
            style={{
              color: 'var(--main-color-green',
            }}
          >
            mn
          </span>
          Tasks
        </p>
        <div style={CircleWrapper}>
          <motion.span
            className="CircleAni CircleAniGreen"
            variants={LoadingCircleVariants}
            transition={LoadingCircleTransitione}
          ></motion.span>
          <motion.span
            className="CircleAni CircleAniGrey"
            variants={LoadingCircleVariants}
            transition={LoadingCircleTransitione}
          ></motion.span>
          <motion.span
            className="CircleAni CircleAniOrange"
            variants={LoadingCircleVariants}
            transition={LoadingCircleTransitione}
          ></motion.span>
        </div>
      </motion.div>
    </>
  );
};

export default BasicLoadingAni;
