import React from 'react';
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

import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import Breadcrumb from "../components/layout/Breadcrumb";

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
        <Metrics></Metrics>
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
    return (
        <>
            <Breadcrumb breadcrumbs={breadcrumbs} welcome_msg={'Welcome to I-NERGY Load Forecasting'}/>

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