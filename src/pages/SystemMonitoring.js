import React from 'react';

import Container from '@mui/material/Container';
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

import Breadcrumb from "../components/layout/Breadcrumb";
import CpuUsageBarChart from "../components/homepage/systemMonitoring/CpuUsageBarChart";
import MemoryUsageBars from "../components/homepage/systemMonitoring/MemoryUsageBars";
import GpuUsageBars from "../components/homepage/systemMonitoring/GpuUsageBars";

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
            <Breadcrumb breadcrumbs={breadcrumbs} welcome_msg={''}/>
            <Container maxWidth={'xl'} sx={{mt: 5, mb: 2}}>
                <MemoryUsageBars/>
            </Container>
            <Container maxWidth={'xl'} sx={{my: 2}}>
                <GpuUsageBars/>
            </Container>
            <Container maxWidth={'xl'} sx={{my: 2}}>
                <CpuUsageBarChart/>
            </Container>

        </>
    );
}

export default SystemMonitoring;