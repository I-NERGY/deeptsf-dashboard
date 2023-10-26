import React, {useEffect, useState, useRef} from 'react';
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

const MemoryUsageBars = () => {
    let memoryCount = 0
    const liveRefreshMax = 20
    const [timeExceeded, setTimeExceeded] = useState(false)

    const [loading, setLoading] = useState(false)
    const [expanded, setExpanded] = useState(true)

    const [vmHigh, setVmHigh] = useState(null)
    const [vmLow, setVmLow] = useState(null)
    const [vmTitle, setVmTitle] = useState('')
    const [swapHigh, setSwapHigh] = useState(null)
    const [swapLow, setSwapLow] = useState(null)
    const [swapTitle, setSwapTitle] = useState('')

    const [memoryUsageError, setMemoryUsageError] = useState(false)

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const getMemoryUsageData = () => {
        axios.get('/system_monitoring/get_memory_usage')
            .then(response => {
                console.log('aaxaxaxaxa')
                memoryCount++
                setVmHigh(response.data.progressbar_1.high)
                setVmLow(response.data.progressbar_1.low)
                setVmTitle(response.data.progressbar_1.title)
                setSwapHigh(response.data.progressbar_2.high)
                setSwapLow(response.data.progressbar_2.low)
                setSwapTitle(response.data.progressbar_2.title)
                setLoading(false)
                setMemoryUsageError(false)
            })
            .catch(error => {
                memoryCount++
                setMemoryUsageError(true)
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
        memoryCount = 0
        setInterval(() => {
            memoryCount < liveRefreshMax && getMemoryUsageData()
            memoryCount >= liveRefreshMax && setTimeExceeded(true)
        }, 3000)
    }

    useEffect(() => {
        setLoading(true)
        setMemoryUsageError(false)
        getMemoryUsageData()

        const interval = setInterval(() => {
            memoryCount < liveRefreshMax && getMemoryUsageData()
            memoryCount >= liveRefreshMax && setTimeExceeded(true)
        }, 3000)

        return () => clearInterval(interval);
    }, [])

    return (
        <>
            <Accordion expanded={expanded} onChange={handleChange('panel1')} elevation={3} data-testid={'systemMonitoringMemoryUsage'}>
                <AccordionSummary className={'accordion'} sx={{backgroundColor: '#AABD5B'}}
                                  expandIcon={<ExpandMoreIcon/>}
                                  aria-controls="panel1bh-content"
                                  id="panel1bh-header"
                >
                    <Grid container direction="row" alignItems="center" justifyItems={'center'}>
                        <Typography variant={'h5'} display={'flex'} alignItems={'center'} color={'white'}>
                            <StorageIcon fontSize={'medium'} sx={{mr: 2}}/>
                            Memory Usage
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
                {!loading && !memoryUsageError && <AccordionDetails sx={{my: 4}}>
                    <ProgressBar title={vmTitle} high={vmHigh} low={vmLow}/>
                    <ProgressBar title={swapTitle} high={swapHigh} low={swapLow}/>
                </AccordionDetails>}
                {memoryUsageError && !loading && <AccordionDetails><Alert severity="warning" sx={{my: 1}}>No data
                    available.</Alert></AccordionDetails>}
                {loading && <AccordionDetails>
                    <Loading/>
                </AccordionDetails>}
            </Accordion>
        </>
    );
}

export default MemoryUsageBars;