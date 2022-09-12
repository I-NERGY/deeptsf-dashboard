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
    const [expanded, setExpanded] = React.useState(false);

    const [cpuLabels, setCpuLabels] = useState([])
    const [cpuData, setCpuData] = useState([])

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };


    useEffect(() => {
        setLoading(true)
        axios.get('')
            .then(response => {
                setLoading(false)
            })
            .catch(error => {
                setLoading(false)
            })
    }, [])

    return (
        <>
            <Breadcrumb breadcrumbs={breadcrumbs} welcome_msg={'Welcome to I-NERGY Load Forecasting'}/>
            <Container maxWidth={'xl'} sx={{my: 5}}>

                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
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
                        {!loading && <div>Bar Chart</div>}
                        {loading && <Loading/>}
                    </AccordionDetails>
                </Accordion>
            </Container>

        </>
    );
}

export default SystemMonitoring;