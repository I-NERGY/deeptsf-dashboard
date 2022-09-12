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
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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
    const [expanded, setExpanded] = useState(true);

    const [cpuLabels, setCpuLabels] = useState([])
    const [cpuData, setCpuData] = useState([])

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const getCpuUsage = () => {
        axios.get('/system_monitoring/get_cpu_usage')
            .then(response => {
                console.log(response.data)
                setCpuData(response.data.barchart_1.data)
                setCpuLabels(response.data.barchart_1.labels)
                setLoading(false)
            })
            .catch(error => {
                setLoading(false)
            })
    }

    useEffect(() => {
        setLoading(true)
        getCpuUsage()
    }, [])

    useEffect(() => {
        setTimeout(() => {
            getCpuUsage()
        }, 3000)
    }, [cpuData])

    return (
        <>
            <Breadcrumb breadcrumbs={breadcrumbs} welcome_msg={'Welcome to I-NERGY Load Forecasting'}/>
            <Container maxWidth={'xl'} sx={{my: 5}}>

                <Accordion expanded={expanded} onChange={handleChange('panel1')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Grid container direction="row" alignItems="center" justifyItems={'center'}>
                            <Typography variant={'h4'} display={'flex'} alignItems={'center'}>
                                <MemoryIcon fontSize={'large'} sx={{mr: 2}}/>
                                CPU Usage (%)
                            </Typography>
                        </Grid>
                    </AccordionSummary>
                    <AccordionDetails>
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
                    </AccordionDetails>
                </Accordion>
            </Container>

        </>
    );
}

export default SystemMonitoring;