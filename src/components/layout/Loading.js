import React from 'react';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const Loading = () => {
    return (
        <Box sx={{display: 'flex'}}>
            <CircularProgress size={30} sx={{mx: 'auto'}}/>
        </Box>
    );
}

export default Loading;