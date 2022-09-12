import React, {useEffect, useState} from 'react';
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
import {Line} from 'react-chartjs-2';

import Container from '@mui/material/Container';
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MemoryIcon from '@mui/icons-material/Memory';

import Breadcrumb from "../components/layout/Breadcrumb";
import Loading from "../components/layout/Loading";
import Divider from "@mui/material/Divider";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
);

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
    const [loading, setLoading] = useState(false)

    useEffect(() => {

    }, [])

    return (
        <>
            <Breadcrumb breadcrumbs={breadcrumbs} welcome_msg={'Welcome to I-NERGY Load Forecasting'}/>
            <Container maxWidth={'xl'} sx={{my: 5}}></Container>

            <Container maxWidth={'xl'} sx={{mt: 5, mb: 2}}>
                <Grid container direction="row" alignItems="center" justifyItems={'center'}>
                    <Typography variant={'h4'} display={'flex'} alignItems={'center'}>
                        <MemoryIcon fontSize={'large'} sx={{mr: 2}}/>
                        CPU Usage (%)
                    </Typography>
                </Grid>
                <Divider sx={{my: 2}}/>
                {/*{noBarChart && <Alert severity="warning" sx={{my: 5}}>No data available for this experiment.</Alert>}*/}
                {/*{loadingBarChart && <Loading/>}*/}
            </Container>
        </>
    );
}

export default SystemMonitoring;