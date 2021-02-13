import React from 'react';
import { ConverDate } from '../../functions/ConvertDate';

const SearchResults = ({ date, finishedDate }) => {
  const dateOutput = ConverDate(date, finishedDate);

  return (
    <div style={{ display: 'block' }} className="status__task">
      <p className="task__date">
        Date added:
        <span style={{ fontWeight: '900', color: 'var(--secondary-grey)' }}>
          {dateOutput.dateAdded}
        </span>
      </p>
      <p
        style={{
          borderBottom: '1px solid #333',
          paddingBottom: '.3rem',
          textAlign: 'center',
          marginTop: '2rem',
        }}
      >
        Date finished:
        <span
          style={{
            fontWeight: '700',
            marginLeft: '1rem',
            color: 'var(--secondary-grey)',
          }}
        >
          {dateOutput.dateFinished}
        </span>
      </p>
    </div>
  );
};

export default SearchResults;
