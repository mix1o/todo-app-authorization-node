import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const AnimationWrapper = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  background-color: var(--header-color);
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  positione: absolute;
  top: 0;
  left: 0;
  z-index: 999;
`;
const CircleWrapper = styled.div`
  display: flex;
`;
const CircleMotion = styled(motion.span)`
  width: 25px;
  height: 25px;
  border-radius: 100px;
  display: block;
  margin: 0 1.5rem;
  justify-content: center;
  background-color: ${({ styledBGColor }) => styledBGColor};
`;
const LogoStyle = styled.p`
  margin-bottom: 3rem;
  font-size: 3rem;
  font-weight: 700;
  color: var(--white);
`;

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
    transition: {
      duration: 0.4,
      repeat: 'Infinity',
      repeatType: 'reverse',
      ease: 'easeInOut',
    },
  },
  end: {
    y: '100%',
    transition: {
      duration: 0.4,
      repeat: 'Infinity',
      repeatType: 'reverse',
      ease: 'easeInOut',
    },
  },
};

const BasicLoadingAni = () => {
  return (
    <AnimationWrapper
      variants={LoadingWrapperVariants}
      initial="start"
      animate="end"
    >
      <LogoStyle>
        <span
          style={{
            color: 'var(--main-color-green',
          }}
        >
          mn
        </span>
        Tasks
      </LogoStyle>
      <CircleWrapper>
        <CircleMotion
          styledBGColor={'var(--light-green)'}
          className="CircleAni CircleAniGreen"
          variants={LoadingCircleVariants}
        ></CircleMotion>
        <CircleMotion
          styledBGColor={'var(--red)'}
          className="CircleAni CircleAniGrey"
          variants={LoadingCircleVariants}
        ></CircleMotion>
        <CircleMotion
          styledBGColor={'var(--border-guide-color)'}
          className="CircleAni CircleAniOrange"
          variants={LoadingCircleVariants}
        ></CircleMotion>
      </CircleWrapper>
    </AnimationWrapper>
  );
};

export default BasicLoadingAni;
