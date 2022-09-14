import * as React from 'react';
import {styled} from '@mui/material/styles';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import LinearProgress, {linearProgressClasses} from '@mui/material/LinearProgress';
import Grid from "@mui/material/Grid";

export default function ProgressBar({title, high, low, percent}) {
    const value = (low / high) * 100

    const BorderLinearProgress = styled(LinearProgress)(({theme}) => ({
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
            <Grid container spacing={2} display={'flex'} alignItems={'center'}>
                <Grid item md={3} xs={12}>
                    <Typography fontWeight={'bold'}>{title}</Typography>
                </Grid>
                <Grid item md={7} xs={6} sx={{mb: {xs: 4, md: 0}}}>
                    <BorderLinearProgress variant="determinate" value={value ? value < 101 ? value : 100 : 0}/>
                </Grid>
                {percent === undefined && <Grid item md={2} xs={6} display={'flex'} sx={{mb: {xs: 4, md: 0}}}>
                    <Typography variant="body2" fontWeight={'bold'}>[</Typography>
                    {low !== null && <Typography variant="body2" fontWeight={'bold'} color={value > 90 ? 'error.dark' :
                        value > 60 ? 'warning.dark' :
                            value > 40 ? '.warning.light' :
                                'success.main'}>
                        {low}
                    </Typography>}
                    {high !== null && <Typography variant="body2" fontWeight={'bold'}>&nbsp;/ {high}]</Typography>}
                </Grid>}
                {percent !== undefined && <Grid item md={2} xs={6} display={'flex'} sx={{mb: {xs: 4, md: 0}}}>
                    <Typography variant="body2" fontWeight={'bold'} color={percent > 90 ? 'error.dark' :
                        percent > 60 ? 'warning.dark' :
                            percent > 40 ? '.warning.light' :
                                'success.main'}>{percent}%
                    </Typography>
                </Grid>}
            </Grid>
        </Container>
    );
}