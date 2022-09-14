import React, {useState} from 'react';
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import NumbersIcon from "@mui/icons-material/Numbers";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import ChevronRight from "@mui/icons-material/ChevronRight";
import SettingsIcon from '@mui/icons-material/Settings';
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import {Bar, Line} from "react-chartjs-2";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Alert from "@mui/material/Alert";
import Loading from "../layout/Loading";
import axios from "axios";

const ByRunId = () => {
    const [runID, setRunID] = useState('')
    const [limit, setLimit] = useState(0)

    const [barChartLabels, setBarChartLabels] = useState([])
    const [barChartValues, setBarChartValues] = useState([])
    const [loadingBarChart, setLoadingBarChart] = useState(false)
    const [noBarChart, setNoBarChart] = useState(false)

    const [lineChartLabels, setLineChartLabels] = useState([])
    const [lineChartFirstValues, setLineChartFirstValues] = useState([])
    const [lineChartSecondValues, setLineChartSecondValues] = useState([])
    const [loadingLineChart, setLoadingLineChart] = useState(false)
    const [noLineChart, setNoLineChart] = useState(false)

    const fetchMetrics = (run, limit) => {
        setNoBarChart(false)
        setNoLineChart(false)

        setLoadingBarChart(true)
        setLoadingLineChart(true)

        // Get data for Bar Chart
        axios.get(`/results/get_metric_list/${run}`)
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
        axios.get(`/results/get_forecast_vs_actual/${run}/n_samples/${limit ? limit : 200}`)
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
    }

    return (
        <>
            <Grid container spacing={2} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                <Grid item xs={12} md={6}>
                    <Stack direction="row" spacing={2} sx={{alignItems: 'center'}}>
                        <SettingsIcon fontSize="large"
                                     sx={{width: '60px', height: '60px', color: '#A1B927', ml: 2, my: 1}}/>
                        <Typography variant={'h5'} color={'inherit'} sx={{width: '100%'}}>Insert desired Run
                            ID</Typography>
                    </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                        <TextField id="outlined-basic"
                                   label="Run ID" variant="outlined"
                                   onChange={e => setRunID(e.target.value)}
                        />
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
                    <Button variant={'contained'} component={'span'} size={'large'} color={'success'}
                            disabled={!runID}
                            endIcon={<ChevronRight/>} onClick={() => fetchMetrics(runID, limit)}>
                        <Typography variant={'subtitle1'}>LOAD METRICS</Typography>
                    </Button>
                </Stack>
            </Grid>

            <Divider sx={{mt: 2, mb: 4}}/>

            <Grid container direction="row" alignItems="center" justifyItems={'center'}>
                <Typography variant={'h4'} display={'flex'} alignItems={'center'}>
                    <ChevronRightIcon
                        fontSize={'large'}/> Model Evaluation Metrics
                </Typography>
            </Grid>

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
            {noBarChart && <Alert severity="warning" sx={{my: 5}}>No data available for this experiment.</Alert>}
            {loadingBarChart && <Loading/>}

            <Divider sx={{my: 5}}/>

            <Grid container direction="row" alignItems="center" justifyItems={'center'}>
                <Typography variant={'h4'} display={'flex'} alignItems={'center'}>
                    <ChevronRightIcon
                        fontSize={'large'}/> Forecasted vs Actual Load Series
                </Typography>
            </Grid>
            {noLineChart && <Alert severity="warning" sx={{my: 5}}>No data available for this experiment.</Alert>}
            {loadingLineChart && <Loading/>}

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

export default ByRunId;