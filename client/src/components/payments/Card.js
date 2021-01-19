import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CounterSubscriber, useCounter } from '../../store/sub';
import styled from 'styled-components';

const SectionBGColor = styled.section`
  background-color: ${({ changeColor }) =>
    changeColor ? '#1db95e' : '#ebf0f5'};
  border-radius: 2.6rem 2.6rem 0 0;
  padding-bottom: 5rem;
`;
const StyledDiv = styled.div`
  color: ${({ changeFontColor }) => (changeFontColor ? '#f7fafc' : '#1db95e')};
  width: 70%;
  margin: 0 auto;
  text-align: left;
  font-size: 2rem;
  font-weight: 500;
  line-height: 2.5rem;
`;

const Card = ({
  title,
  price,
  description,
  className,
  recomendation,
  priceFull,
}) => {
  const [state, actions] = useCounter();

  return (
    <div className={className}>
      <SectionBGColor changeColor={recomendation} className="card__topInfo">
        <h3>{title}</h3>
        <StyledDiv changeFontColor={recomendation} className="card__listDesc">
          <p>
            <i className="card__checkIcon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  width="20"
                  height="20"
                  rx="10"
                  fill={`${recomendation ? '#f7fafc' : '#1db95e'}`}
                />
                <path
                  d="M8.5 15L4 10.6977L5.3955 9.26829L8.4735 12.1939L14.5785 6L16 7.40304L8.5 15Z"
                  fill={`${recomendation ? '#1db95e' : '#f7fafc'}`}
                />
              </svg>
            </i>
            {description.row1}
          </p>
          <p>
            <i className="card__checkIcon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  width="20"
                  height="20"
                  rx="10"
                  fill={`${recomendation ? '#f7fafc' : '#1db95e'}`}
                />
                <path
                  d="M8.5 15L4 10.6977L5.3955 9.26829L8.4735 12.1939L14.5785 6L16 7.40304L8.5 15Z"
                  fill={`${recomendation ? '#1db95e' : '#f7fafc'}`}
                />
              </svg>
            </i>
            {description.row2}
          </p>
          <p>
            <i className="card__checkIcon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  width="20"
                  height="20"
                  rx="10"
                  fill={`${recomendation ? '#f7fafc' : '#1db95e'}`}
                />
                <path
                  d="M8.5 15L4 10.6977L5.3955 9.26829L8.4735 12.1939L14.5785 6L16 7.40304L8.5 15Z"
                  fill={`${recomendation ? '#1db95e' : '#f7fafc'}`}
                />
              </svg>
            </i>
            {description.row3}
          </p>
        </StyledDiv>
      </SectionBGColor>
      <p className="card__price">
        {price.roundedPrice}
        <span className="card__span">{price.afterComma}</span>
      </p>
      <Link to="/pay-now">
        <button
          className={`card__btn ${
            recomendation ? 'btn__main--empty' : 'btn__main--full'
          }`}
          onClick={() => actions.payment(priceFull)}
        >
          Choose
        </button>
      </Link>
    </div>
  );
};

export default Card;
