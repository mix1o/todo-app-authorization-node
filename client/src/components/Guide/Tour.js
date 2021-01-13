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
        showProgress={true}
        continuous={true}
        showSkipButton={true}
        local={{
          last: 'End tour',
          skip: 'Skip tour',
        }}
      />
    </>
  );
};

export default Tour;
