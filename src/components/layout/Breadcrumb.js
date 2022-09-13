import React from 'react';

import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const Breadcrumb = ({breadcrumbs, welcome_msg}) => {
    return (
        <Paper style={{display: 'flex'}} sx={{px: 2, pb: 2, pt: {xs: 5, md: 2}, backgroundColor: '#F5F8E9', marginTop: '-8px', position: 'sticky'}}>
            <Stack spacing={2}>
                <Container maxWidth={'xl'} sx={{paddingTop: '15px'}}>
                    <Breadcrumbs
                        separator={<NavigateNextIcon fontSize="small"/>}
                        aria-label="breadcrumb"
                    >
                        {breadcrumbs}
                    </Breadcrumbs>
                    <Box color={'text.secondary'}>
                        <h2 style={{color: 'text.primary', marginTop: 0, marginBottom: 0}}>{welcome_msg}</h2>
                    </Box>
                </Container>
            </Stack>
        </Paper>
    );
}

export default Breadcrumb;