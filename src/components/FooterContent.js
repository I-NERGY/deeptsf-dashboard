import React from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const FooterContent = () => {
    return (
        <Container maxWidth={'xl'}>
            <Grid container spacing={0}
                  alignItems="center" justifyItems={'center'}>
                <Grid item xs={12} md={4}>
                    <Typography fontSize={'small'}>Copyright I-NERGY Consortium @{new Date().getFullYear()} All rights reserved</Typography>
                </Grid>

                <Box item xs={12} md={1} marginX={'auto'} alignItems="center" justifyItems={'center'}>
                    <img src="/images/ec_logo.jpg" alt="" height={'44px'} style={{marginTop: '8px'}}/>
                </Box>

                <Grid item xs={12} md={7}>
                    <Typography fontSize={'small'} alignContent={'center'}> Co-funded
                        by the Horizon 2020
                        Framework Programme of the European Union Under grant
                        agreement No 101016508
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    );
}

export default FooterContent;