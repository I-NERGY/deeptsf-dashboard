import React, {useEffect, useState} from 'react';
import axios from "axios";

import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import ModelTrainingIcon from "@mui/icons-material/ModelTraining";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";

import DataUsageIcon from "@mui/icons-material/DataUsage";
import NumbersIcon from "@mui/icons-material/Numbers";
import ChevronRight from "@mui/icons-material/ChevronRight";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import Loading from "../layout/Loading";

import {Bar, Line} from "react-chartjs-2";

const ByEvaluationMetric = () => {
    const [experiments, setExperiments] = useState([])
    const [experimentChosen, setExperimentChosen] = useState(0)
    const [bestRun, setBestRun] = useState('')

    const [barChartLabels, setBarChartLabels] = useState([])
    const [barChartValues, setBarChartValues] = useState([])
    const [loadingBarChart, setLoadingBarChart] = useState(false)
    const [noBarChart, setNoBarChart] = useState(false)

    const [lineChartLabels, setLineChartLabels] = useState([])
    const [lineChartFirstValues, setLineChartFirstValues] = useState([])
    const [lineChartSecondValues, setLineChartSecondValues] = useState([])
    const [loadingLineChart, setLoadingLineChart] = useState(false)
    const [noLineChart, setNoLineChart] = useState(false)

    const [metrics, setMetrics] = useState('')
    const [metricChosen, setMetricChosen] = useState('')

    const [limit, setLimit] = useState(0)

    const initializeCharts = () => {
        setBarChartLabels([])
        setBarChartValues([])
        setLineChartLabels([])
        setLineChartFirstValues([])
        setLineChartSecondValues([])
    }

    const fetchData = () => {
        // Experiments
        axios.get('/results/get_list_of_experiments')
            .then(response => {
                setExperiments(response.data)
            })
            .catch(error => {
                console.log(error)
            })

        // Metrics
        axios.get('/metrics/get_metric_names')
            .then(response => {
                setMetrics(response.data)
            })
            .catch(error => {
                console.log(error)
            })

        // Get default best run
        axios.get(`/results/get_best_run_id_by_mlflow_experiment/${experimentChosen}/mape`)
            .then(response => {
                setBestRun(response.data)
            })
            .catch(error => console.log('error'))
    }

    const fetchMetrics = (experiment, metric, run) => {
        setNoBarChart(false)
        setNoLineChart(false)

        setLoadingBarChart(true)
        setLoadingLineChart(true)
        axios.get(`/results/get_best_run_id_by_mlflow_experiment/${experiment}/${metric ? metric : 'mape'}`)
            .then(response => {
                console.log(response.data)
                setBestRun(response.data)
                // Get data for Bar Chart
                axios.get(`/results/get_metric_list/${run ? run : response.data}`)
                    .then(response => {
                        setBarChartLabels(response.data.labels)
                        setBarChartValues(response.data.data)
                        setLoadingBarChart(false)
                    })
                    .catch(error => {
                        setLoadingBarChart(false)
                        setNoBarChart(true)
                        console.log(error)
                    })

                // Get data for Line Chart
                axios.get(`/results/get_forecast_vs_actual/${run ? run : response.data}/n_samples/${limit ? limit : 200}`)
                    .then(response => {
                        setLineChartLabels(response.data.actual.index)
                        setLineChartFirstValues(response.data.actual.data)
                        setLineChartSecondValues(response.data.forecast.data)
                        setLoadingLineChart(false)
                    })
                    .catch(error => {
                        setLoadingLineChart(false)
                        setNoLineChart(true)
                        console.log(error)
                    })
            })
            .catch(error => {
                setLoadingBarChart(false)
                setLoadingLineChart(false)
                setNoBarChart(true)
                setNoLineChart(true)
                console.log(error)
            })
    }

    useEffect(() => {
        fetchData()
        axios.get(`/results/get_best_run_id_by_mlflow_experiment/0/mape`)
            .then(response => {
                setBestRun(response.data)
                fetchMetrics(0, 'mape', response.data)
            })
    }, [])

    useEffect(() => {
        initializeCharts()
        setNoLineChart(false)
        setNoBarChart(false)
        setBestRun('')
        axios.get(`/results/get_best_run_id_by_mlflow_experiment/${experimentChosen}/${metricChosen ? metricChosen : null}`)
            .then(response => {
                setBestRun(response.data)
            })
    }, [experimentChosen])

    return (
        <>
            <Grid container spacing={2} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                <Grid item xs={12} md={6}>
                    <Stack direction="row" spacing={2} sx={{alignItems: 'center'}}>
                        <ModelTrainingIcon fontSize="large"
                                           sx={{width: '60px', height: '60px', color: '#A1B927', ml: 2, my: 1}}/>
                        <Typography variant={'h5'} color={'inherit'} sx={{width: '100%'}}>Track your
                            experiment</Typography>
                    </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth required>
                        <InputLabel id="demo-simple-select-label">Choose an experiment</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={experimentChosen}
                            label="Choose an experiment"
                            onChange={e => setExperimentChosen(e.target.value)}
                        >
                            {experiments && experiments.map(experiment => (
                                <MenuItem key={experiment.experiment_id}
                                          value={experiment.experiment_id}>{experiment?.experiment_name ? experiment.experiment_name : 'Default'}</MenuItem>))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Stack direction="row" spacing={2} sx={{alignItems: 'center'}}>
                        <DataUsageIcon fontSize="large"
                                       sx={{width: '60px', height: '60px', color: '#A1B927', ml: 2, my: 1}}/>
                        <Typography variant={'h5'} color={'inherit'} sx={{width: '100%'}}>Main evaluation
                            metric</Typography>
                    </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Choose a metric</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={metricChosen}
                            label="Choose a metric"
                            onChange={e => setMetricChosen(e.target.value)}
                        >
                            {metrics && metrics.map(metric => (
                                <MenuItem key={metric.search_term}
                                          value={metric.search_term}>{metric.metric_name}</MenuItem>))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Stack direction="row" spacing={2} sx={{alignItems: 'center'}}>
                        <NumbersIcon fontSize="large"
                                     sx={{width: '60px', height: '60px', color: '#A1B927', ml: 2, my: 1}}/>
                        <Typography variant={'h5'} color={'inherit'} sx={{width: '100%'}}>Number of evaluation
                            samples</Typography>
                    </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                        <TextField type={'number'} InputProps={{inputProps: {min: 0, max: 2000}}}
                                   id="outlined-basic"
                                   label="Evaluation samples" variant="outlined"
                                   onChange={e => setLimit(e.target.value)}/>
                    </FormControl>
                </Grid>

                <Stack sx={{ml: 'auto', my: 2}} direction={'row'} spacing={2}>
                    {bestRun && <Button variant={'contained'} component={'span'} size={'large'} color={'warning'}
                                        sx={{ml: 'auto'}}
                                        endIcon={<ChevronRight/>}
                                        onClick={() => window.open(`http://131.154.97.48:5000/#/experiments/${experimentChosen}/runs/${bestRun}`, '_blank')}
                    >
                        <Typography variant={'subtitle1'}>DETAILS ON MLFLOW</Typography>
                    </Button>}
                    <Button variant={'contained'} component={'span'} size={'large'} color={'success'}
                            onClick={() => fetchMetrics(experimentChosen, metricChosen)}
                            endIcon={<ChevronRight/>}><Typography variant={'subtitle1'}>LOAD
                        METRICS</Typography></Button>
                </Stack>
            </Grid>

            <Divider sx={{my: 4}}/>

            {/*<Container maxWidth={'xl'} sx={{mt: 5, mb: 2}}>*/}
                <Grid container direction="row" alignItems="center" justifyItems={'center'}>
                    <Typography variant={'h4'} display={'flex'} alignItems={'center'}>
                        <ChevronRightIcon
                            fontSize={'large'}/> Model Evaluation Metrics
                    </Typography>
                </Grid>
                {noBarChart && <Alert severity="warning" sx={{my: 5}}>No data available for this experiment.</Alert>}
                {loadingBarChart && <Loading/>}
            {/*</Container>*/}

            {barChartValues.length > 1 && !loadingBarChart && <React.Fragment>
                <Container>
                    <Bar data={{
                        labels: barChartLabels,
                        datasets: [{
                            label: 'Model Evaluation Metrics',
                            data: barChartValues,
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
                </Container>
            </React.Fragment>}

            <Divider sx={{my: 5}}/>

            {/*<Container maxWidth={'xl'} sx={{my: 2}}>*/}
                <Grid container direction="row" alignItems="center" justifyItems={'center'}>
                    <Typography variant={'h4'} display={'flex'} alignItems={'center'}>
                        <ChevronRightIcon
                            fontSize={'large'}/> Forecasted vs Actual Load Series
                    </Typography>
                </Grid>
                {noLineChart && <Alert severity="warning" sx={{my: 5}}>No data available for this experiment.</Alert>}
                {loadingLineChart && <Loading/>}
            {/*</Container>*/}

            <Divider sx={{mt: 5}}/>

            {lineChartFirstValues.length > 1 && lineChartSecondValues.length > 1 && !loadingLineChart &&
                <React.Fragment>
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
                        }} data={{
                            labels: lineChartLabels,
                            datasets: [
                                {
                                    label: 'Actual',
                                    data: lineChartFirstValues,
                                    borderColor: 'rgb(255, 99, 132)',
                                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                                    yAxisID: 'y',
                                },
                                {
                                    label: 'Forecast',
                                    data: lineChartSecondValues,
                                    borderColor: 'rgb(53, 162, 235)',
                                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                                    yAxisID: 'y',
                                },
                            ],
                        }}/>
                    </Container>
                </React.Fragment>}
        </>
    );
}

export default ByEvaluationMetric;