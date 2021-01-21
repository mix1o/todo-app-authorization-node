import React from 'react';
import styled from 'styled-components';

const ParagraphError = styled.p`
  color: ${({ isCorrect }) => (isCorrect ? '#2d3748' : '#e53e3e')};
`;

const Warning = ({ errorMessage, isCorrect,position }) => {
  return (
    <ParagraphError style={position ? {position: 'static'} : {position: 'absolute'}} className="section__message" isCorrect={isCorrect}>
      {errorMessage}
    </ParagraphError>
  );
};

export default Warning;
