import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const CircleWrapper = styled.div`
  display: flex;
`;
const AnimationWrapper = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  background-color: var(--header-color);
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
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
            styledBGColor={'var(--main-color-green)'}
            className="CircleAni CircleAniGreen"
            variants={LoadingCircleVariants}
            transition={LoadingCircleTransitione}
          ></CircleMotion>
          <CircleMotion
            styledBGColor={'var(--header-color)'}
            className="CircleAni CircleAniGrey"
            variants={LoadingCircleVariants}
            transition={LoadingCircleTransitione}
          ></CircleMotion>
          <CircleMotion
            styledBGColor={'var(--border-guide-color)'}
            className="CircleAni CircleAniOrange"
            variants={LoadingCircleVariants}
            transition={LoadingCircleTransitione}
          ></CircleMotion>
        </CircleWrapper>
      </AnimationWrapper>
    </>
  );
};

export default BasicLoadingAni;
