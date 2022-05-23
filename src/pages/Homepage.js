import React from 'react';
import Typography from "@mui/material/Typography";

import Breadcrumb from "../components/layout/Breadcrumb";
import HomepageItemFullWidth from "../components/homepage/HomepageItemFullWidth";
import {servicesHomepage} from "../components/homepage/servicesHomepage";

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
        <>
            {/*<Breadcrumb breadcrumbs={breadcrumbs} welcome_msg={'Welcome to Dashboard boilerplate'}/>*/}

            {servicesHomepage.map((service, index) => (
                <HomepageItemFullWidth title={service.title} description={service.description} icon={service.icon}
                                       image={service.image} link={service.link} index={index} key={service.id}/>
            ))}

        </>
    );
}

export default Homepage;