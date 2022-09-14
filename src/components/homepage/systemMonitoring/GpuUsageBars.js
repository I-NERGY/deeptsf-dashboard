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

import ProgressBar from "../../layout/ProgressBar";
import Loading from "../../layout/Loading";

const GpuUsageBars = () => {
    const [loading, setLoading] = useState(false)
    const [expanded, setExpanded] = useState(true)

    const [gpu, setGpu] = useState(null)
    const [gpuMemoryHigh, setGpuMemoryHigh] = useState(null)
    const [gpuMemoryLow, setGpuMemoryLow] = useState(null)

    const [gpuUsageError, setGpuUsageError] = useState(false)

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const getGpuUsageData = () => {
        axios.get('/system_monitoring/get_gpu_usage')
            .then(response => {
                console.log(response.data[0])
                setGpu(response.data[0].progressbar_1.percent)
                setGpuMemoryHigh(response.data[0].progressbar_2.high)
                setGpuMemoryLow(response.data[0].progressbar_2.low)
                setLoading(false)
            })
            .catch(error => {
                console.log(error)
                setGpuUsageError(true)
                setLoading(false)
            })
    }

    useEffect(() => {
        setLoading(true)
        setGpuUsageError(false)
        getGpuUsageData()
        setInterval(() => {
            getGpuUsageData()
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
                            GPU Usage
                        </Typography>
                    </Grid>
                </AccordionSummary>
                {!loading && !gpuUsageError && <AccordionDetails sx={{my: 4}}>
                    <ProgressBar title={'GPU utilization'} percent={gpu}/>
                    <ProgressBar title={'GPU memory utilization'} high={gpuMemoryHigh} low={gpuMemoryLow} percent={undefined}/>
                </AccordionDetails>}
                {gpuUsageError && !loading && <Alert severity="warning" sx={{my: 1}}>No data available.</Alert>}
                {loading && <AccordionDetails>
                    <Loading/>
                </AccordionDetails>}
            </Accordion>
        </>
    );
}

export default GpuUsageBars;