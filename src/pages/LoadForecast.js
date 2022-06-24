import React, {useState} from 'react';
import axios from "axios";

import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Stack from "@mui/material/Stack";
import IconButton from '@mui/material/IconButton';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';

import Breadcrumb from "../components/layout/Breadcrumb";

const AlertCustom = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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
        Load Forecasting
    </Typography>,
];

const LoadForecast = () => {
    const [newFile, setNewFile] = useState()
    const [newFileSuccess, setNewFileSuccess] = useState(false)
    const [newFileFailure, setNewFileFailure] = useState(false)
    const [newFileSnackbar, setNewFileSnackbar] = useState(false)

    const handleAddNewFile = file => {
        setNewFile(file)
    }

    const handleUploadFile = (file) => {
        const data = new FormData()

        data.append('file', newFile)

        axios.post('/upload/ttl/files', data, {headers: {"Content-Type": "multipart/form-data"}})
            .then(response => {
                setNewFileSnackbar(true)
                setNewFileSuccess(true)
                setNewFileFailure(false)
                setNewFile(null)
                // document.getElementById('raised-button-file').value = ''
            })
            .catch(error => {
                setNewFileSnackbar(true)
                setNewFileSuccess(false)
                setNewFileFailure(true)
                setNewFile(null)
                document.getElementById('raised-button-file').value = ''
                console.log(error)
            })
    }

    const closeSnackbar = () => {
        setNewFileSuccess(false)
        setNewFileFailure(false)
    }

    return (
        <div>
            <Breadcrumb breadcrumbs={breadcrumbs} welcome_msg={`Welcome to I-NERGY Load Forecasting`}/>

            <Container maxWidth={'xl'} sx={{mt: 5}}>
                <Stack direction="row" spacing={2} sx={{alignItems: 'center'}}>
                    <input
                        accept=".csv"
                        style={{display: 'none'}}
                        id="raised-button-file"
                        type="file"
                        onChange={(event) => handleAddNewFile(event.target.files[0])}
                    />

                    <label htmlFor="raised-button-file">
                        <IconButton component={'span'} size={'large'}>
                            <UploadFileOutlinedIcon fontSize="large" sx={{width: '80px', height: '80px'}}/>
                        </IconButton>
                    </label>
                    <Typography variant={'h5'} color={'inherit'} sx={{width: '100%'}}>Upload your .csv file</Typography>
                    {newFile && <Typography variant={'h5'} color={'inherit'} align={'right'} sx={{width: '100%'}}>Chosen
                        file: <Typography fontWeight={'bold'}
                                          color={'secondary'}>{newFile.name}</Typography></Typography>}
                </Stack>
                <Stack direction="row" spacing={2} sx={{alignItems: 'center'}}>
                    {newFile && <Button variant={'contained'} component={'span'} size={'large'} color={'success'}
                                        sx={{ml: 'auto'}}
                                        endIcon={<UploadFileOutlinedIcon/>} onClick={handleUploadFile}>
                        Upload file
                    </Button>}
                </Stack>
            </Container>
            <Snackbar open={newFileSuccess} autoHideDuration={3000} onClose={closeSnackbar}>
                <AlertCustom onClose={closeSnackbar} severity="success" sx={{width: '100%', mb: 5}}>
                    The new file has been successfully uploaded!
                </AlertCustom>
            </Snackbar>
            <Snackbar open={newFileFailure} autoHideDuration={3000} onClose={closeSnackbar}>
                <AlertCustom onClose={closeSnackbar} severity="error" sx={{width: '100%', mb: 5}}>
                    Something went wrong! Please try again!
                </AlertCustom>
            </Snackbar>
        </div>
    );
}

export default LoadForecast;