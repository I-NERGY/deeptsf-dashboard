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

const MemoryUsageBars = () => {
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
                setVmHigh(response.data.progressbar_1.high)
                setVmLow(response.data.progressbar_1.low)
                setVmTitle(response.data.progressbar_1.title) // TODO
                setSwapHigh(response.data.progressbar_2.high)
                setSwapLow(response.data.progressbar_2.low)
                setSwapTitle(response.data.progressbar_2.title) // TODO
                setLoading(false)
                setMemoryUsageError(false)
            })
            .catch(error => {
                setMemoryUsageError(true)
                setLoading(false)
            })
    }

    useEffect(() => {
        setLoading(true)
        setMemoryUsageError(false)
        getMemoryUsageData()
        setInterval(() => {
            getMemoryUsageData()
        }, 60000)
    }, [])

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
                            <StorageIcon fontSize={'medium'} sx={{mr: 2}}/>
                            Memory Usage
                        </Typography>
                    </Grid>
                </AccordionSummary>
                {!loading && !memoryUsageError && <AccordionDetails sx={{my: 4}}>
                    <ProgressBar title={vmTitle} high={vmHigh} low={vmLow}/>
                    <ProgressBar title={swapTitle} high={swapHigh} low={swapLow}/>
                </AccordionDetails>}
                {memoryUsageError && !loading && <AccordionDetails><Alert severity="warning" sx={{my: 1}}>No data available.</Alert></AccordionDetails>}
                {loading && <AccordionDetails>
                    <Loading/>
                </AccordionDetails>}
            </Accordion>
        </>
    );
}

export default MemoryUsageBars;