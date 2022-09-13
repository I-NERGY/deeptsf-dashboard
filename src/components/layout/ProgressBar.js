import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

export default function ProgressBar({value}) {
    const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
        height: 20,
        borderRadius: 5,
        [`&.${linearProgressClasses.colorPrimary}`]: {
            backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        },
        [`& .${linearProgressClasses.bar}`]: {
            borderRadius: 5,
            backgroundColor: value > 90 ? theme.palette.error.dark :
                value > 60 ? theme.palette.warning.dark :
                    value > 40 ? theme.palette.warning.light :
                        theme.palette.success.main,
        },

    }));

    return (
        <Box sx={{ flexGrow: 1 }}>
            <BorderLinearProgress variant="determinate"  />
        </Box>
    );
}