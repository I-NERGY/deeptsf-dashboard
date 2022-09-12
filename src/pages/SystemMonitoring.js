import React from 'react';

import Container from '@mui/material/Container';

import Breadcrumb from "../components/layout/Breadcrumb";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

const breadcrumbs = [
    <Link fontSize={'20px'} underline="hover" key="1" color="inherit" href="/">
        Dashboard
    </Link>, <Typography
        underline="hover"
        key="2"
        color="secondary"
        fontSize={'20px'}
        fontWeight={600}>
        System Monitoring
    </Typography>,];

function SystemMonitoring(props) {
    return (
        <>
            <Breadcrumb breadcrumbs={breadcrumbs} welcome_msg={'Welcome to I-NERGY Load Forecasting'}/>
            <Container maxWidth={'xl'} sx={{my: 5}}></Container>
        </>
    );
}

export default SystemMonitoring;