import React from 'react';
import {useNavigate} from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

import Typography from "@mui/material/Typography";

const HomepageItemFullWidth = ({title, description, link, icon, image, index}) => {
    let navigate = useNavigate();

    return (<React.Fragment>
            <Grid container sx={{position: 'relative'}}>
                {link && <Avatar className={'linkAvatar'} onClick={() => navigate(link)}>
                    <InsertLinkIcon className={'serviceCategoryLinkIcon'}/>
                </Avatar>}

                <Grid item className={(index % 2) ? 'serviceCategoryDescriptionEven' : 'serviceCategoryDescriptionOdd'}
                      xs={12} md={6}
                      order={(index % 2) ? {xs: 2, md: 2} : {xs: 2, md: 1}}
                      sx={{height: {md: '500px', xs: '500px', zIndex: 2}}}
                      display={'flex'} alignItems={'center'}>
                    <Container maxWidth={'md'} sx={{p: 5}}>
                        <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                            {icon}
                            <Typography variant={'h3'} color={'white'}>{title}</Typography>
                        </Box>
                        <Divider color={'#fff'} sx={{width: '30%', mx: 'auto', height: '1px', mt: 5}}/>
                        <Typography variant={'h4'} color={'white'} align={'center'}
                                    sx={{my: 3, px: 1, fontWeight: '100'}}>{description}</Typography>
                        <Divider color={'#fff'} sx={{width: '30%', mx: 'auto', height: '1px', mt: 3}}/>
                    </Container>
                </Grid>
                <Grid item xs={12} md={6} sx={{height: {md: '500px', xs: '500px', overflow: 'hidden'}}}
                      order={(index % 2) ? {xs: 1, md: 1} : {xs: 1, md: 2}}>
                    <img style={{height: '100%', width: '100%', objectFit: 'cover'}}
                         src={image} className={'homepageServiceImage'}
                         alt=""/>
                </Grid>
            </Grid>
        </React.Fragment>);
}

export default HomepageItemFullWidth;