import React from 'react';
import Typography from "@mui/material/Typography";

import Breadcrumb from "../components/layout/Breadcrumb";

const Homepage = () => {
    const breadcrumbs = [
        <Typography fontSize={'16px'} underline="hover" key="1" color="inherit">
            Dashboard
        </Typography>,
        <Typography key="2" color="secondary" fontWeight={'bold'} fontSize={'16px'}>
            {'Homepage'}
        </Typography>,
    ];
    return (
        <React.Fragment>
            <Breadcrumb breadcrumbs={breadcrumbs} welcome_msg={'Welcome to Dashboard boilerplate'}/>
        </React.Fragment>
    );
}

export default Homepage;