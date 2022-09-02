import React, {useState, useEffect} from "react";
import {styled} from '@mui/material/styles';

import useAuthContext from "../hooks/useAuthContext";
import axios from "../api/axios";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ArrowRightRoundedIcon from '@mui/icons-material/ArrowRightRounded';

import Breadcrumb from "../components/layout/Breadcrumb";

const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#333',
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 18,
    },
    fontSize: '20px',
    paddingTop: '18px',
    paddingBottom: '18px',
    fontWeight: '100',
    borderBottom: '1px solid #ccc'
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const UserProfile = () => {
    const {auth} = useAuthContext()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [userID, setUserID] = useState('')
    const [roles, setRoles] = useState([])
    const [attributes, setAttributes] = useState([])

    const [infoLoading, setInfoLoading] = useState(false)
    const [rolesLoading, setRolesLoading] = useState(false)
    const [attributesLoading, setAttributesLoading] = useState(false)

    const [userInfoExpanded, setUserInfoExpanded] = useState(true)
    const [rolesExpanded, setRolesExpanded] = useState(false)
    const [attributesExpanded, setAttributesExpanded] = useState(false)

    // Get user info on first load
    // useEffect(() => {
    //     setInfoLoading(true)
    //     axios.get(`/user/get/username/${auth.username}`)
    //         .then(response => {
    //             if (response.data.attributes) {
    //                 setAttributes(Object.entries(response.data.attributes))
    //             }
    //             setFirstName(response.data.firstName)
    //             setLastName(response.data.lastName)
    //             setEmail(response.data.email)
    //             setUserID(response.data.id)
    //             setInfoLoading(false)
    //
    //         })
    //         .catch(error => {
    //             setInfoLoading(false)
    //             console.log(error)
    //         })
    // }, [])
    //
    // // Get user roles on first load
    // useEffect(() => {
    //     setRolesLoading(true)
    //     axios.get(`user/${auth.username}/client/VesselAI_platform/roles`) // # TODO initiate RDF Pool client
    //         .then(response => {
    //             setTimeout(() => {
    //                 setRolesLoading(false)
    //                 setRoles(response.data.roles)
    //             }, 500)
    //         })
    //         .catch(error => {
    //             setRolesLoading(false)
    //             console.log(error)
    //         })
    // }, [])

    const breadcrumbs = [
        <Typography fontSize={'16px'} underline="hover" key="1" color="inherit">
            Dashboard
        </Typography>,
        <Link fontSize={'16px'} underline="hover" key="1" color="inherit" href="/">
            Homepage
        </Link>,
        <Typography key="2" color="secondary" fontWeight={'bold'} fontSize={'16px'}>
            {'User Profile'}
        </Typography>,
    ];

    return (
        <React.Fragment>
            <Breadcrumb breadcrumbs={breadcrumbs} welcome_msg={'Welcome to your MATRYCS RDF Pool profile page'}/>

            {!infoLoading && <Box style={{display: 'flex'}} sx={{padding: 3, width: '100%'}}>
                <Accordion expanded={userInfoExpanded} sx={{width: '100%'}}>
                    <AccordionSummary
                        onClick={() => setUserInfoExpanded(!userInfoExpanded)}
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Grid container>
                            <Grid item md={3} xs={6}>
                                <Typography sx={{flexShrink: 2}} variant={'h6'}>
                                    Currently logged in user:
                                </Typography>
                            </Grid>

                            <Box item md={3} xs={6} display={'flex'} justifyContent={'center'} alignContent={'center'}>
                                <FiberManualRecordIcon sx={{marginRight: '5px'}} color={'success'}
                                                       style={{marginTop: '5%'}}/>
                                <Typography variant={'h6'}
                                            sx={{color: 'text.secondary', fontWeight: 'bold'}}>{auth.username}
                                </Typography>
                            </Box>

                            <Typography item variant={'h6'}
                                        sx={{
                                            color: 'text.secondary',
                                            marginLeft: 'auto',
                                            display: {xs: 'none', md: 'block'}
                                        }}>
                                {!userInfoExpanded && 'Click for details'}
                            </Typography>
                        </Grid>

                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={0}>
                            <Grid item sm={12} style={{
                                overflow: 'scroll',
                                overflowX: 'auto',
                                overflowY: 'auto',
                                paddingBottom: '10px'
                            }}>
                                <TableContainer component={Paper}>
                                    <Table sx={{minWidth: 650}} size="small" aria-label="a dense table">
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell align="center">Username</StyledTableCell>
                                                <StyledTableCell align="center">User ID</StyledTableCell>
                                                <StyledTableCell align="center">Roles</StyledTableCell>
                                                <StyledTableCell align="center">Attributes</StyledTableCell>
                                                <StyledTableCell align="center">Email</StyledTableCell>
                                                <StyledTableCell align="center">First Name</StyledTableCell>
                                                <StyledTableCell align="center">Last Name</StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <StyledTableRow
                                                sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                                <TableCell sx={{fontSize: '18px', padding: '10px'}} align="center">
                                                    <Typography fontSize={'large'}>{auth.username}</Typography>
                                                </TableCell>
                                                <TableCell sx={{fontSize: '18px', padding: '10px'}} align="center">
                                                    <Typography fontSize={'large'}>{userID}</Typography>
                                                </TableCell>
                                                <TableCell sx={{fontSize: '18px', padding: '10px'}} align="center">
                                                    {roles.length > 0 &&
                                                    <Accordion expanded={rolesExpanded}
                                                               onClick={() => setRolesExpanded(!rolesExpanded)}
                                                    >
                                                        <AccordionSummary
                                                            expandIcon={<ExpandMoreIcon/>}
                                                            aria-controls="panel2bh-content"
                                                            id="panel2bh-header">
                                                            <Container>
                                                                <Typography fontSize={'large'} align={'center'}
                                                                            fontWeight={'bold'}>
                                                                    {roles.length} role{roles.length > 1 && 's'}.
                                                                </Typography>
                                                                {!rolesExpanded &&
                                                                <Typography fontSize={'large'} overflow={'hidden'}
                                                                            align={'center'}>{'Click to expand.'}
                                                                </Typography>}
                                                            </Container>
                                                        </AccordionSummary>

                                                        <AccordionDetails>
                                                            {roles.map(role => (
                                                                <Grid display={'flex'} padding={0} key={role}
                                                                      sx={{overflow: 'hidden'}}>
                                                                    <ArrowRightRoundedIcon/>
                                                                    {role}<br/>
                                                                </Grid>
                                                            ))}
                                                        </AccordionDetails>
                                                    </Accordion>}
                                                    {(roles.length === 0) &&
                                                    <Typography fontSize={'large'}>No roles assigned.</Typography>}
                                                </TableCell>
                                                <TableCell sx={{fontSize: '18px', padding: '10px'}} align="center">
                                                    {attributes.length > 0 &&
                                                    <Accordion expanded={attributesExpanded}
                                                               onClick={() => setAttributesExpanded(!attributesExpanded)}
                                                    >
                                                        <AccordionSummary
                                                            expandIcon={<ExpandMoreIcon/>}
                                                            aria-controls="panel2bh-content"
                                                            id="panel2bh-header">
                                                            <Container>
                                                                <Typography fontSize={'large'} align={'center'}
                                                                            fontWeight={'bold'}>
                                                                    {attributes.length} attribute{attributes.length > 1 && 's'}.
                                                                </Typography>
                                                                {!attributesExpanded &&
                                                                <Typography fontSize={'large'} overflow={'hidden'}
                                                                            align={'center'}>{'Click to expand.'}
                                                                </Typography>}
                                                            </Container>
                                                        </AccordionSummary>

                                                        <AccordionDetails>
                                                            {attributes.map(attribute => (
                                                                <Stack direction={'row'} key={attribute[0]}>
                                                                    <Typography
                                                                        fontWeight={'bold'}>{attribute[0]}</Typography>
                                                                    <Typography>:&nbsp;</Typography>
                                                                    <Typography>{attribute[1]} </Typography> </Stack>
                                                            ))}
                                                        </AccordionDetails>
                                                    </Accordion>}
                                                    {(attributes.length === 0) &&
                                                    <Typography fontSize={'large'}>No attributes assigned.</Typography>}
                                                </TableCell>
                                                <TableCell sx={{fontSize: '18px', padding: '10px'}} align="center">
                                                    <Typography fontSize={'large'}>{email}</Typography>
                                                </TableCell>
                                                <TableCell sx={{fontSize: '18px', padding: '10px'}} align="center">
                                                    <Typography fontSize={'large'}>{firstName}</Typography>
                                                </TableCell>
                                                <TableCell sx={{fontSize: '18px', padding: '10px'}} align="center">
                                                    <Typography fontSize={'large'}>{lastName}</Typography>
                                                </TableCell>
                                            </StyledTableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            </Box>}
        </React.Fragment>
    );
};

export default UserProfile;