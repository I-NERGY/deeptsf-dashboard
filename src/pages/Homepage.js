import React from 'react';

import HomepageItemFullWidth from "../components/homepage/HomepageItemFullWidth";
import {servicesHomepage} from "../components/homepage/servicesHomepage";

const Homepage = () => {
    return (
        <>
            {servicesHomepage.map((service, index) => (
                <HomepageItemFullWidth title={service.title} description={service.description} icon={service.icon}
                                       image={service.image} link={service.link} index={index} key={service.id}/>
            ))}

        </>
    );
}

export default Homepage;