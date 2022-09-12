import React from 'react';
import axios from "axios";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
} from 'chart.js';

import {Bar} from 'react-chartjs-2';

import Container from '@mui/material/Container';
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

import Breadcrumb from "../components/layout/Breadcrumb";

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
            <Container maxWidth={'xl'} sx={{my: 5}}></Container>
        </>
    );
}

export default SystemMonitoring;