import React, {useState} from 'react';

import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

import IconButton from '@mui/material/IconButton';
import UploadFileTwoToneIcon from '@mui/icons-material/UploadFileTwoTone';

import Breadcrumb from "../components/layout/Breadcrumb";
import Stack from "@mui/material/Stack";

const breadcrumbs = [
    <Link fontSize={'20px'} underline="hover" key="1" color="inherit" href="/">
        Dashboard
    </Link>,
    <Typography
        underline="hover"
        key="2"
        color="secondary"
        fontSize={'20px'}
        fontWeight={600}
    >
        Pilots
    </Typography>,
];

const LoadForecast = () => {
    const [newFile, setNewFile] = useState()

    const handleAddNewFile = file => {
        setNewFile(file)
    }

    return (
        <div>
            <Breadcrumb breadcrumbs={breadcrumbs} welcome_msg={`Welcome to I-NERGY Load Forecasting`}/>

            <Container maxWidth={'xl'} sx={{mt: 5}}>
                <Stack direction="row" spacing={2} sx={{alignItems: 'center'}}>
                    <input
                        // accept=".csv"
                        style={{display: 'none'}}
                        id="raised-button-file"
                        type="file"
                        onChange={(event) => handleAddNewFile(event.target.files[0])}
                    />

                    <label htmlFor="raised-button-file">
                        <IconButton component={'span'} size={'large'}>
                            <UploadFileTwoToneIcon fontSize="large" sx={{width: '80px', height: '80px'}}/>
                        </IconButton>
                    </label>
                    <Typography variant={'h5'} color={'inherit'} sx={{width: '100%'}}>Upload your .csv file</Typography>
                    {newFile && <Typography variant={'h5'} color={'inherit'} align={'right'} sx={{width: '100%'}}>Chosen
                        file: <Typography fontWeight={'bold'} color={'secondary'}>{newFile.name}</Typography></Typography>}
                </Stack>

            </Container>

        </div>
    );
}

export default LoadForecast;