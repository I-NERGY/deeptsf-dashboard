import React from 'react';

import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import Breadcrumb from "../components/layout/Breadcrumb";

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

const LoadForecast = (props) => {
    return (
        <div>
            <Breadcrumb breadcrumbs={breadcrumbs} welcome_msg={`Welcome to I-NERGY Load Forecasting`}/>
        </div>
    );
}

export default LoadForecast;