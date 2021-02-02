import React from 'react';

const SearchResults = ({
  title,
  description,
  complete,
  date,
  finishedDate,
  priority,
}) => {
  return (
    <div>
      <p>{title}</p>
      <p>{description}</p>
      <p>{complete}</p>
      <p>{date}</p>
      <p>{priority}</p>
      <p>{finishedDate}</p>
      <hr />
    </div>

<div style={{ display: 'block' }} className="status__task">
<p className="task__date">
  Date added:{' '}
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
