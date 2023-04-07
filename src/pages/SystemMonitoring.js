import React, {useEffect, useState} from 'react';

import Container from '@mui/material/Container';
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

import Breadcrumb from "../components/layout/Breadcrumb";
import CpuUsageBarChart from "../components/systemMonitoring/CpuUsageBarChart";
import MemoryUsageBars from "../components/systemMonitoring/MemoryUsageBars";
import GpuUsageBars from "../components/systemMonitoring/GpuUsageBars";
import {useKeycloak} from "@react-keycloak/web";
import {useNavigate} from "react-router-dom";

const breadcrumbs = [
    <Link fontSize={'20px'} underline="hover" key="1" color="inherit" href="/">
        Dashboard
    </Link>, <Typography
        underline="hover"
        key="2"
        color="secondary"
        fontSize={'20px'}
        fontWeight={600}>
        System Monitoring
    </Typography>,];

const SystemMonitoring = () => {
    const {keycloak, initialized} = useKeycloak()
    const navigate = useNavigate();
    const [allowed, setAllowed] = useState(false)

    useEffect(() => {
        if (initialized) {
            let roles = keycloak.realmAccess.roles
            if (roles.includes('inergy_admin')) {
                setAllowed(true)
            } else navigate('/')
        }
    }, [initialized])

    return (
        <>
            <Breadcrumb breadcrumbs={breadcrumbs} welcome_msg={''}/>

            {allowed && <>
                <Container maxWidth={'xl'} sx={{mt: 5, mb: 2}}>
                    <MemoryUsageBars/>
                </Container>
                <Container maxWidth={'xl'} sx={{my: 2}}>
                    <GpuUsageBars/>
                </Container>
                <Container maxWidth={'xl'} sx={{my: 2}}>
                    <CpuUsageBarChart/>
                </Container>
            </>}
        </>
    );
}

export default SystemMonitoring;