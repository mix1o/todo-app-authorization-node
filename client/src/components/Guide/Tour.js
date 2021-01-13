import React, { useState } from 'react';
import Joyride from 'react-joyride';

const Tour = ({ steps, open }) => {
  const [help, setHelp] = useState(false);
  setTimeout(() => {
    if (open) {
      setHelp(true);
    }
  }, 400);

  return (
    <>
      <Joyride
        run={help}
        steps={steps}
        continuous={true}
        showSkipButton={true}
        styles={{
          options: {
            arrowColor: '#2F2E41',
            backgroundColor: '#2F2E41',
            textColor: '#f7fafc',
          },
          tooltipContent: {
            paddingBottom: '10px',
            marginBottom: '50px',
            borderBottom: '2px',
            borderBottomStyle: 'solid',
            borderBottomColor: '#ff9b21',
          },
          buttonSkip: {
            border: '2px',
            borderRadius: '3px',
            padding: '7px 15px',
            fontWeight: '700',
            letterSpacing: '1px',
            borderStyle: 'solid',
            borderColor: '#1DB95E',
            color: '#1DB95E',
          },
          buttonNext: {
            padding: '8px 15px',
            backgroundColor: '#1DB95E',
          },
          buttonBack: {
            color: '#1DB95E',
          },
        }}
        local={{
          last: 'End tour',
          skip: 'Skip tour',
        }}
      />
    </>
  );
};

export default Tour;
