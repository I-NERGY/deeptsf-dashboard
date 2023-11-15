import React, {useEffect, useState} from 'react';

import Container from '@mui/material/Container';
import Typography from "@mui/material/Typography";

import Breadcrumb from "../components/layout/Breadcrumb";
import CpuUsageBarChart from "../components/systemMonitoring/CpuUsageBarChart";
import MemoryUsageBars from "../components/systemMonitoring/MemoryUsageBars";
import GpuUsageBars from "../components/systemMonitoring/GpuUsageBars";
import {useKeycloak} from "@react-keycloak/web";
import {Link, useNavigate} from "react-router-dom";

const breadcrumbs = [
    <Link className={'breadcrumbLink'} key="1" to="/">
        Homepage
    </Link>,
    <Typography
        underline="hover"
        key="2"
        color="secondary"
        fontSize={'20px'}
        fontWeight={600}>
        System Monitoring
    </Typography>
];

const SystemMonitoring = () => {
    const authenticationEnabled = process.env.REACT_APP_AUTH === "True"
    const {keycloak, initialized} = useKeycloak()
    const navigate = useNavigate();

    // Comment out the following line FOR TESTING
    const [allowed, setAllowed] = useState(null)

    // Uncomment the following line FOR TESTING
    // const [allowed, setAllowed] = useState(true)

    useEffect(() => {
        if (initialized) {
            let roles = keycloak.realmAccess.roles
            if (roles.includes('inergy_admin')) {
                setAllowed(true)
            } else navigate('/')
        }

        if (!authenticationEnabled) {
            setAllowed(true)
        }
    }, [initialized])

    return (
        <>
            <Breadcrumb breadcrumbs={breadcrumbs} welcome_msg={''}/>

            {/* Comment out the following line FOR TESTING */}
            {(initialized || !authenticationEnabled) && allowed && <>

                {/* Uncomment the following line FOR TESTING */}
                {/*{allowed && <>*/}
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