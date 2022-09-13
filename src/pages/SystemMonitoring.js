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
import AlertTitle from '@mui/material/AlertTitle';
import Grid from "@mui/material/Grid";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Button from '@mui/material/Button';
import Divider from "@mui/material/Divider";

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MemoryIcon from '@mui/icons-material/Memory';
import RefreshIcon from '@mui/icons-material/Refresh';

import Breadcrumb from "../components/layout/Breadcrumb";
import Loading from "../components/layout/Loading";
import Stack from "@mui/material/Stack";

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
    const [expanded, setExpanded] = useState(true)

    const liveRefreshMax = 20

    const [cpuLabels, setCpuLabels] = useState([])
    const [cpuData, setCpuData] = useState([])
    const [cpuError, setCpuError] = useState(false)
    const [cpuCount, setCpuCount] = useState(0)

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const getCpuUsage = () => {
        axios.get('/system_monitoring/get_cpu_usage')
            .then(response => {
                console.log(response.data)
                setCpuCount(cpuCount + 1)
                setCpuData(response.data.barchart_1.data)
                setCpuLabels(response.data.barchart_1.labels)
                setLoading(false)

            })
            .catch(error => {
                setLoading(false)
                setCpuError(true)
                setCpuCount(cpuCount + 1)
            })
    }

    useEffect(() => {
        setLoading(true)
        getCpuUsage()
    }, [])

    useEffect(() => {
        setTimeout(() => {
            cpuCount < liveRefreshMax && cpuData.length > 1 && getCpuUsage()
        }, 3000)
    }, [cpuData])

    const restoreLiveFeed = () => {
        setCpuCount(0)
    }

    useEffect(() => {
        cpuCount === 0 && getCpuUsage()
    }, [cpuCount])

    return (
        <>
            <Breadcrumb breadcrumbs={breadcrumbs} welcome_msg={'Welcome to I-NERGY Load Forecasting'}/>
            <Container maxWidth={'xl'} sx={{my: 5}}>
                <Accordion expanded={expanded} onChange={handleChange('panel1')} elevation={3}>
                    <AccordionSummary className={'accordion'} sx={{backgroundColor: '#AABD5B'}}
                                      expandIcon={<ExpandMoreIcon/>}
                                      aria-controls="panel1bh-content"
                                      id="panel1bh-header"
                    >
                        <Grid container direction="row" alignItems="center" justifyItems={'center'}>
                            <Typography variant={'h4'} display={'flex'} alignItems={'center'} color={'white'}>
                                <MemoryIcon fontSize={'large'} sx={{mr: 2}}/>
                                CPU Usage (%)
                            </Typography>

                        </Grid>
                    </AccordionSummary>
                    <AccordionDetails>
                        {cpuCount >= liveRefreshMax && !loading &&
                            <Container>
                                <Alert severity="info" sx={{alignItems: 'center'}}>
                                    <Typography sx={{width: '100%'}}>
                                        Live refresh time limit exceeded.
                                        <Button variant={'contained'} component={'span'} size={'medium'}
                                                color={'info'}
                                                sx={{ml: 5}}
                                                endIcon={<RefreshIcon/>}
                                                onClick={restoreLiveFeed}>
                                            Restore live feed
                                        </Button>
                                    </Typography>
                                </Alert>
                            </Container>
                        }
                        {!loading && cpuData.length > 1 && cpuLabels.length > 1 && <>
                            <Container>
                                <Bar data={{
                                    labels: cpuLabels,
                                    datasets: [{
                                        label: 'Model Evaluation Metrics',
                                        data: cpuData,
                                        backgroundColor: [
                                            'rgba(255, 99, 132, 0.2)',
                                            'rgba(54, 162, 235, 0.2)',
                                            'rgba(255, 206, 86, 0.2)',
                                            'rgba(75, 192, 192, 0.2)',
                                            'rgba(153, 102, 255, 0.2)',
                                            'rgba(255, 159, 64, 0.2)',
                                        ],
                                    }]
                                }} options={{
                                    title: {
                                        display: true,
                                        fontSize: 20
                                    },
                                    legend: {
                                        display: true,
                                        position: 'right'
                                    }
                                }}
                                />
                            </Container></>}
                        {loading && <Loading/>}
                        {cpuError && !loading && <Alert severity="warning" sx={{my: 1}}>No data available.</Alert>}
                    </AccordionDetails>
                </Accordion>
            </Container>

        </>
    );
}

export default SystemMonitoring;