import * as React from 'react';
import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

export default function ProgressBar({title, value}) {
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
        <Container maxWidth={'xl'} sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
            <Box sx={{width: '100%', mr: 1}}>
                <Typography fontWeight={'bold'}>{title}</Typography>
            </Box>
            <Box sx={{width: '100%', mr: 1}}>
                <BorderLinearProgress variant="determinate" value={value ? value < 101 ? value : 100 : 0}/>
            </Box>
            <Box sx={{minWidth: 35}}>
                <Typography variant="body2" fontWeight={'bold'} color={value > 90 ? 'error.dark' :
                    value > 60 ? 'warning.dark' :
                        value > 40 ? '.warning.light' :
                            'success.main'}>
                    {value ? `${value.toFixed(2)}%` : '0%'}
                </Typography>
            </Box>
        </Container>

    );
}