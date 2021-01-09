import React from 'react';
import styled from 'styled-components';

const ParagraphError = styled.p`
  color: #e53e3e;
`;

const Warning = ({ errorMessage }) => {
  return (
    <ParagraphError className="section__message">{errorMessage}</ParagraphError>
  );
};

export default Warning;
