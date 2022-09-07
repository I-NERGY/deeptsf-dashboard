import React, {useState, useEffect} from 'react';
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

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ModelTrainingIcon from "@mui/icons-material/ModelTraining";
import DataUsageIcon from '@mui/icons-material/DataUsage';
import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined';

import Breadcrumb from "../components/layout/Breadcrumb";
import ChevronRight from "@mui/icons-material/ChevronRight";


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
        Metrics
    </Typography>,];

const state = {
    labels: ['January', 'February', 'March',
        'April', 'May'],
    datasets: [
        {
            label: 'Rainfall',
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [65, 59, 80, 81, 56]
        }
    ]
}

const labels = ['January', 'February', 'March',
    'April', 'May']

const data = {
    labels: labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: labels.map(() => Math.random() * 100),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            yAxisID: 'y',
        },
        {
            label: 'Dataset 2',
            data: labels.map(() => Math.random() * 100),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
            yAxisID: 'y1',
        },
    ],
};

const Metrics = () => {
    const [experiments, setExperiments] = useState([])
    const [experimentChosen, setExperimentChosen] = useState('')
    const [experimentChosenError, setExperimentChosenError] = useState(false)

    const [metrics, setMetrics] = useState('')
    const [metricChosen, setMetricChosen] = useState('')

    const fetchData = () => {
        setExperimentChosenError(false)
        !experimentChosen && setExperimentChosenError(true)

        experimentChosen && axios.get('')
            .then(response => {

            })
            .catch(error => {

            })
    }

    return (
        <>
            <Breadcrumb breadcrumbs={breadcrumbs} welcome_msg={'Welcome to I-NERGY Load Forecasting'}/>

            <Container maxWidth={'xl'} sx={{my: 5}}>
                <Typography variant={'h4'} fontWeight={'bold'} sx={{mb: 3}}>Experiment Setup</Typography>
                <Grid container spacing={2} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                    <Grid item xs={12} md={6}>
                        <Stack direction="row" spacing={2} sx={{alignItems: 'center'}}>
                            <ModelTrainingIcon fontSize="large"
                                               sx={{width: '60px', height: '60px', color: '#A1B927', ml: 2, my: 1}}/>
                            <Typography variant={'h5'} color={'inherit'} sx={{width: '100%'}}>Experiment</Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth required error={experimentChosenError}>
                            <InputLabel id="demo-simple-select-label">Choose an experiment</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={experimentChosen}
                                error={experimentChosenError}
                                label="Choose an experiment"
                                onChange={e => setExperimentChosen(e.target.value)}
                            >
                                {experiments && experiments.map(experiment => (
                                    <MenuItem key={experiment.experiment_id}
                                              value={experiment.experiment_id}>{experiment.experiment_name}</MenuItem>))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Stack direction="row" spacing={2} sx={{alignItems: 'center'}}>
                            <DataUsageIcon fontSize="large"
                                               sx={{width: '60px', height: '60px', color: '#A1B927', ml: 2, my: 1}}/>
                            <Typography variant={'h5'} color={'inherit'} sx={{width: '100%'}}>Metric</Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Choose a metric</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={metricChosen}
                                disabled={!experimentChosen}
                                label="Choose an experiment"
                                onChange={e => setMetricChosen(e.target.value)}
                            >
                                {metrics && metrics.map(metric => (
                                    <MenuItem key={metric.metric_id}
                                              value={metric.metric_id}>{metric.metric_name}</MenuItem>))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Stack sx={{ml: 'auto', my: 2}} direction={'row'} spacing={2}>
                        <Button variant={'contained'} component={'span'} size={'large'} color={'success'}
                                 fullWidth onClick={() => fetchData(experimentChosen, metricChosen)}
                                endIcon={<ChevronRight/>}>GO</Button>
                        <Button variant={'contained'} component={'span'} size={'large'} color={'error'}
                                 fullWidth
                                endIcon={<BackspaceOutlinedIcon/>}>CLEAR</Button>
                    </Stack>

                </Grid>
            </Container>

            <Container maxWidth={'xl'} sx={{mt: 5, mb: 2}}>
                <Grid container direction="row" alignItems="center" justifyItems={'center'}>
                    <Typography variant={'h4'} display={'flex'} alignItems={'center'}>
                        <ChevronRightIcon
                            fontSize={'large'}/> Model Evaluation Metrics
                    </Typography>
                </Grid>
                {/*<Typography variant={'h4'}><ChevronRightIcon fontSize={'large'}/> Model Evaluation Metrics</Typography>*/}
            </Container>

            <Container>
                <Bar data={state} options={{
                    title: {
                        display: true,
                        text: 'Average Rainfall per month',
                        fontSize: 20
                    },
                    legend: {
                        display: true,
                        position: 'right'
                    }
                }}
                />
            </Container>

            <Divider sx={{my: 5}}/>

            <Container maxWidth={'xl'} sx={{my: 2}}>
                <Typography variant={'h4'} display={'flex'} alignItems={'center'}>
                    <ChevronRightIcon
                        fontSize={'large'}/>Forecasted vs Actual Load Series
                </Typography>
            </Container>

            <Container sx={{mb: 5}}>
                <Line options={{
                    responsive: true,
                    interaction: {
                        mode: 'index',
                        intersect: false,
                    },
                    stacked: false,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Chart.js Line Chart - Multi Axis',
                        },
                    },
                    scales: {
                        y: {
                            type: 'linear',
                            display: true,
                            position: 'left',
                        },
                        y1: {
                            type: 'linear',
                            display: true,
                            position: 'right',
                            grid: {
                                drawOnChartArea: false,
                            },
                        },
                    },
                }} data={data}/>
            </Container>
        </>
    );
}

export default Metrics;