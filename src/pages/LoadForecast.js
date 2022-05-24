import React from 'react';

import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import IconButton from '@mui/material/IconButton';
import UploadFileTwoToneIcon from '@mui/icons-material/UploadFileTwoTone';

import Breadcrumb from "../components/layout/Breadcrumb";
import Stack from "@mui/material/Stack";

const breadcrumbs = [
    <Link fontSize={'20px'} underline="hover" key="1" color="inherit" href="/">
        Dashboard
    </Link>,
    <Typography
        underline="hover"
        key="2"
        color="secondary"
        fontSize={'20px'}
        fontWeight={600}
    >
        Pilots
    </Typography>,
];

const LoadForecast = () => {
    return (
        <div>
            <Breadcrumb breadcrumbs={breadcrumbs} welcome_msg={`Welcome to I-NERGY Load Forecasting`}/>

            <Container maxWidth={'xl'} sx={{mt: 5}}>
                <Stack direction="row" spacing={2} sx={{alignItems: 'center'}}>
                    <IconButton aria-label="upload-file">
                        <UploadFileTwoToneIcon fontSize="large" sx={{width: '80px', height: '80px'}}/>
                    </IconButton>
                    <Typography variant={'h5'} color={'inherit'}>Upload your .csv file</Typography>
                </Stack>

            </Container>

        </div>
    );
}

export default LoadForecast;