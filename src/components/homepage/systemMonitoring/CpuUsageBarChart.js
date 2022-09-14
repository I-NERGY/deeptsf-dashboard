import React, {useEffect, useState} from 'react';
import axios from "axios";
import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip
} from "chart.js";

import {Bar} from "react-chartjs-2";

import AccordionSummary from "@mui/material/AccordionSummary";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Accordion from "@mui/material/Accordion";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MemoryIcon from "@mui/icons-material/Memory";
import RefreshIcon from "@mui/icons-material/Refresh";

import Loading from "../../layout/Loading";


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

const CpuUsageBarChart = () => {
    const [loading, setLoading] = useState(false)
    const [expanded, setExpanded] = useState(true)

    let cpuCount = 0
    const liveRefreshMax = 20

    const [cpuLabels, setCpuLabels] = useState([])
    const [cpuData, setCpuData] = useState([])
    const [cpuError, setCpuError] = useState(false)

    const [timeExceeded, setTimeExceeded] = useState(false)

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const getCpuUsage = () => {
        axios.get('/system_monitoring/get_cpu_usage')
            .then(response => {
                cpuCount++
                setCpuData(response.data.barchart_1.data)
                setCpuLabels(response.data.barchart_1.labels)
                setLoading(false)
            })
            .catch(error => {
                setLoading(false)
                setCpuError(true)
                cpuCount++
            })
    }

    useEffect(() => {
        setLoading(true)

        setInterval(() => {
            cpuCount < liveRefreshMax && getCpuUsage()
            cpuCount >= liveRefreshMax && setTimeExceeded(true)
        }, 3000)
    }, [])

    const restoreLiveFeed = () => {
        // Get a reference to the last interval + 1
        const interval_id = window.setInterval(function () {
        }, Number.MAX_SAFE_INTEGER);

        // Clear any timeout/interval up to that id
        for (let i = 1; i < interval_id; i++) {
            window.clearInterval(i);
        }
        setTimeExceeded(false)
        cpuCount = 0
        setInterval(() => {
            cpuCount < liveRefreshMax && getCpuUsage()
            cpuCount >= liveRefreshMax && setTimeExceeded(true)
        }, 3000)
    }

    useEffect(() => {
        cpuCount === 0 && getCpuUsage()
    }, [cpuCount])

    return (
        <>
            <Accordion expanded={expanded} onChange={handleChange('panel1')} elevation={3}>
                <AccordionSummary className={'accordion'} sx={{backgroundColor: '#AABD5B'}}
                                  expandIcon={<ExpandMoreIcon/>}
                                  aria-controls="panel1bh-content"
                                  id="panel1bh-header"
                >
                    <Grid container direction="row" alignItems="center" justifyItems={'center'}>
                        <Typography variant={'h5'} display={'flex'} alignItems={'center'} color={'white'}>
                            <MemoryIcon fontSize={'medium'} sx={{mr: 2}}/>
                            CPU Usage
                        </Typography>

                    </Grid>
                </AccordionSummary>
                <AccordionDetails>
                    {timeExceeded && !loading &&
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
                                    label: 'CPU Usage (%)',
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
        </>
    );
}

export default CpuUsageBarChart;