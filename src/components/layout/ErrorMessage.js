import React from 'react';

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';

const ErrorMessage = ({message}) => {
    return (
        <Box marginTop={2}>
            <Alert severity="error">{message}</Alert>
        </Box>
    );
}

export default ErrorMessage;