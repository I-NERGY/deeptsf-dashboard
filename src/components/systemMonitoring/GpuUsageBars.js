import React, {useEffect, useState} from 'react';
import axios from "axios";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";

import StorageIcon from '@mui/icons-material/Storage';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import ProgressBar from "../layout/ProgressBar";
import Loading from "../layout/Loading";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import RefreshIcon from "@mui/icons-material/Refresh";

const GpuUsageBars = () => {
    let gpuCount = 0
    const liveRefreshMax = 20
    const [timeExceeded, setTimeExceeded] = useState(false)

    const [loading, setLoading] = useState(false)
    const [expanded, setExpanded] = useState(true)

    const [gpu, setGpu] = useState(null)
    const [gpuMemoryHigh, setGpuMemoryHigh] = useState(null)
    const [gpuMemoryLow, setGpuMemoryLow] = useState(null)
    const [gpuTitle, setGpuTitle] = useState('')
    const [gpuMemoryTitle, setGpuMemoryTitle] = useState('')

    const [gpuUsageError, setGpuUsageError] = useState(false)

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const getGpuUsageData = () => {
        axios.get('/system_monitoring/get_gpu_usage')
            .then(response => {
                gpuCount++
                setGpu(response.data[0].progressbar_1.percent)
                setGpuTitle(response.data[0].progressbar_1.title)
                setGpuMemoryHigh(response.data[0].progressbar_2.high)
                setGpuMemoryLow(response.data[0].progressbar_2.low)
                setGpuMemoryTitle(response.data[0].progressbar_2.title)
                setLoading(false)
            })
            .catch(error => {
                gpuCount++
                setGpuUsageError(true)
                setLoading(false)
            })
    }

    const restoreLiveFeed = () => {
        // Get a reference to the last interval + 1
        const interval_id = window.setInterval(function () {
        }, Number.MAX_SAFE_INTEGER);

        // Clear any timeout/interval up to that id
        for (let i = 1; i < interval_id; i++) {
            window.clearInterval(i);
        }
        setTimeExceeded(false)
        gpuCount = 0
        const interval = setInterval(() => {
            gpuCount < liveRefreshMax && getGpuUsageData()
            gpuCount >= liveRefreshMax && setTimeExceeded(true)
        }, 3000)
    }

    useEffect(() => {
        setLoading(true)
        setGpuUsageError(false)
        getGpuUsageData()
        const interval = setInterval(() => {
            gpuCount < liveRefreshMax && getGpuUsageData()
            gpuCount >= liveRefreshMax && setTimeExceeded(true)
        }, 2000)

        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <Accordion expanded={expanded} onChange={handleChange('panel1')} elevation={3} data-testid={'systemMonitoringGpuUsage'}>
                <AccordionSummary className={'accordion'} sx={{backgroundColor: '#AABD5B'}}
                                  expandIcon={<ExpandMoreIcon/>}
                                  aria-controls="panel1bh-content"
                                  id="panel1bh-header"
                >
                    <Grid container direction="row" alignItems="center" justifyItems={'center'}>
                        <Typography variant={'h5'} display={'flex'} alignItems={'center'} color={'white'}>
                            <StorageIcon fontSize={'medium'} sx={{mr: 2}}/>
                            GPU Usage
                        </Typography>
                    </Grid>
                </AccordionSummary>
                {timeExceeded && !loading &&
                    <AccordionDetails>
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
                    </AccordionDetails>
                }
                {!loading && !gpuUsageError && <AccordionDetails sx={{my: 4}}>
                    <ProgressBar title={gpuTitle} percent={gpu}/>
                    <ProgressBar title={gpuMemoryTitle} high={gpuMemoryHigh} low={gpuMemoryLow} percent={undefined}/>
                </AccordionDetails>}
                {gpuUsageError && !loading && <AccordionDetails><Alert severity="warning" sx={{my: 1}}>No data available.</Alert></AccordionDetails>}
                {loading && <AccordionDetails>
                    <Loading/>
                </AccordionDetails>}
            </Accordion>
        </>
    );
}

export default GpuUsageBars;