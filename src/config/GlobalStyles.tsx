import React from 'react';
import GlobalStyles from '@mui/material/GlobalStyles';

const StylesGlobal: React.FC = () => {
  return (
    <GlobalStyles
      styles={{
        body: { margin: '0px 0px 0px 0px' },
        h5: { fontfamily:'"Josefin Sans", sans-serif' }}}
    />
  );
};

export default StylesGlobal;