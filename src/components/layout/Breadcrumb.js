import React from 'react';
import {blue} from "@mui/material/colors";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

const Breadcrumb = ({breadcrumbs, welcome_msg}) => {
    return (
        <Paper style={{display: 'flex'}} sx={{padding: 2, backgroundColor: blue[50], marginTop: '-8px', position: 'sticky'}}>
            <Stack spacing={2}>
                <Container maxWidth={'xl'} sx={{paddingTop: '5px'}}>
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