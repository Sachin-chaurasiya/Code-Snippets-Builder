import { Box } from '@chakra-ui/react';
import Joyride, { Props } from 'react-joyride';
import { FC } from 'react';

const Tour: FC<Props> = ({ run, steps, callback }) => {
  return (
    <Box id="tour-component">
      <Joyride
        run={run}
        steps={steps}
        continuous
        disableOverlayClose
        disableCloseOnEsc
        scrollToFirstStep
        callback={callback}
        locale={{ open: 'Start the tour', last: 'End Tour' }}
        styles={{
          options: {
            backgroundColor: '#ffffff',
            textColor: '#2D3748',
            arrowColor: '#ffffff',
            primaryColor: '#7256B1',
          },
        }}
      />
    </Box>
  );
};

export default Tour;
