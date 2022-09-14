import React, {useState, useEffect} from 'react';
import axios from "axios";
import PropTypes from 'prop-types';

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
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ModelTrainingIcon from "@mui/icons-material/ModelTraining";
import DataUsageIcon from '@mui/icons-material/DataUsage';
import ChevronRight from "@mui/icons-material/ChevronRight";
import NumbersIcon from '@mui/icons-material/Numbers';

import Breadcrumb from "../components/layout/Breadcrumb";
import Loading from "../components/layout/Loading";
import ByEvaluationMetric from "../components/metrics/ByEvaluationMetric";
import ByRunID from "../components/metrics/ByRunId";

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

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

const Metrics = () => {


    const [value, setValue] = React.useState(0);

    const handleChangeTab = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <Breadcrumb breadcrumbs={breadcrumbs} welcome_msg={''}/>
            <Container maxWidth={'xl'} sx={{my: 5}}>
                <Typography variant={'h4'} fontWeight={'bold'} sx={{mb: 3}}>Experiment Tracking</Typography>
                <Box sx={{width: '100%'}}>
                    <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                        <Tabs value={value} onChange={handleChangeTab} aria-label="basic tabs example">
                            <Tab label="By evaluation metric" {...a11yProps(0)} />
                            <Tab label="By Run ID" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <ByEvaluationMetric/>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <ByRunID/>
                    </TabPanel>
                </Box>
            </Container>
        </>
    );
}

export default Metrics;