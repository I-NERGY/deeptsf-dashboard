import React, {useEffect, useState} from 'react';
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

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import Link from "@mui/material/Link";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';


import Breadcrumb from "../components/layout/Breadcrumb";
import ByEvaluationMetric from "../components/metrics/ByEvaluationMetric";
import ByRunID from "../components/metrics/ByRunId";
import {useKeycloak} from "@react-keycloak/web";
import {useNavigate} from "react-router-dom";

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
        Experiment Tracking
    </Typography>,];

const ExperimentTracking = () => {
    const {keycloak, initialized} = useKeycloak()
    const navigate = useNavigate();
    const [allowed, setAllowed] = useState(false)

    useEffect(() => {
        if (initialized) {
            let roles = keycloak.realmAccess.roles
            if (roles.includes('energy_engineer') || roles.includes('inergy_admin')) {
                setAllowed(true)
            }
            else navigate('/')
        }
    }, [initialized])

    const [value, setValue] = useState(0);

    const handleChangeTab = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <Breadcrumb breadcrumbs={breadcrumbs} welcome_msg={''}/>
            {allowed && <Container maxWidth={'xl'} sx={{my: 5}}>
                <Typography component={'span'} variant={'h4'} fontWeight={'bold'} sx={{mb: 3}}>Track your
                    experiment</Typography>
                <Box sx={{width: '100%', mt: 2}}>
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
            </Container>}
        </>
    );
    // eslint-disable
}

export default ExperimentTracking;