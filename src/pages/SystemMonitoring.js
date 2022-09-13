import React from 'react';

import Container from '@mui/material/Container';
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

import Breadcrumb from "../components/layout/Breadcrumb";
import CpuUsageBarChart from "../components/homepage/systemMonitoring/CpuUsageBarChart";

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

const SystemMonitoring = () => {
    return (
        <>
            <Breadcrumb breadcrumbs={breadcrumbs} welcome_msg={'Welcome to I-NERGY Load Forecasting'}/>
            <Container maxWidth={'xl'} sx={{my: 5}}>
                <CpuUsageBarChart/>
            </Container>
        </>
    );
}

export default SystemMonitoring;