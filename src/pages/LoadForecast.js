import React, {useEffect, useState} from 'react';
import axios from "axios";

import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Stack from "@mui/material/Stack";
import IconButton from '@mui/material/IconButton';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';

import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';

import Breadcrumb from "../components/layout/Breadcrumb";
import FullPageLoading from "../components/layout/FullPageLoading";

const AlertCustom = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const breadcrumbs = [<Link fontSize={'20px'} underline="hover" key="1" color="inherit" href="/">
    Dashboard
</Link>, <Typography
    underline="hover"
    key="2"
    color="secondary"
    fontSize={'20px'}
    fontWeight={600}
>
    Load Forecasting
</Typography>,];

const LoadForecast = () => {
    const [newFile, setNewFile] = useState()
    const [dayFirst, setDayFirst] = useState(false)
    const [models, setModels] = useState([])
    const [model, setModel] = useState('')

    const [loading, setLoading] = useState(false)
    const [newFileSuccess, setNewFileSuccess] = useState(false)
    const [newFileFailure, setNewFileFailure] = useState(false)
    const [newFileSnackbar, setNewFileSnackbar] = useState(false)

    useEffect(() => {
        axios.get('/models/get_model_names')
            .then(response => setModels(response.data.models))
            .catch(error => console.log(error))
    })

    const handleAddNewFile = file => {
        setNewFile(file)
    }

    const handleUploadFile = (file) => {
        setLoading(true)
        const data = new FormData()

        data.append('file', newFile)

        axios.post('/upload/uploadCSVfile/', data, {headers: {"Content-Type": "multipart/form-data"}})
            .then(response => {
                console.log('Upload response: ', response.data)
                const payload = {
                    fname: response.data.fname, day_first: dayFirst,
                }
                console.log(payload)
                axios.post('/upload/validateCSVfile/', payload)
                    .then(response => {
                        console.log('Validate response: ', response.data)
                        setNewFileSnackbar(true)
                        setNewFileSuccess(true)
                        setNewFileFailure(false)
                        setNewFile(null)
                        setLoading(false)
                        document.getElementById('raised-button-file').value = ''
                    })
                    .catch(error => {
                        setLoading(false)
                        setNewFileSnackbar(true)
                        setNewFileSuccess(false)
                        setNewFileFailure(true)
                        setNewFile(null)
                        document.getElementById('raised-button-file').value = ''
                        console.log(error)
                    })
            })
            .catch(error => {
                setLoading(false)
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

    return (<div>
        <Breadcrumb breadcrumbs={breadcrumbs} welcome_msg={'Welcome to I-NERGY Load Forecasting'}/>

        <Container maxWidth={'xl'} sx={{my: 5}}>
            <Grid container spacing={2} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                <Grid item xs={12} md={6}>
                    <input
                        accept=".csv"
                        style={{display: 'none'}}
                        id="raised-button-file"
                        type="file"
                        onChange={(event) => handleAddNewFile(event.target.files[0])}
                    />

                    <Stack direction="row" spacing={2} sx={{alignItems: 'center'}}>
                        <label htmlFor="raised-button-file">
                            <IconButton component={'span'} size={'large'}>
                                <UploadFileOutlinedIcon fontSize="large" sx={{width: '80px', height: '80px', color: '#A1B927'}}/>
                            </IconButton>
                        </label>
                        <Typography variant={'h5'} color={'inherit'} sx={{width: '100%'}}>
                            Upload your .csv file
                        </Typography>
                    </Stack>
                </Grid>

                <Grid item xs={12} md={6}>
                    {newFile && <Typography variant={'h5'} color={'inherit'} align={'right'} sx={{width: '100%'}}>Chosen
                        file: <Typography fontWeight={'bold'}
                                          color={'secondary'}>{newFile.name}</Typography></Typography>}
                    <Stack direction="row" spacing={2} sx={{alignItems: 'center', mb: 2}}>
                        {newFile && <>
                            <Typography sx={{ml: 'auto'}} variant={'h6'}>Day First</Typography>
                            <Checkbox
                                value={dayFirst}
                                onChange={() => setDayFirst(!dayFirst)}
                                sx={{'& .MuiSvgIcon-root': {fontSize: 28}}}
                            />
                        </>}
                    </Stack>
                    <Stack direction="row" spacing={2} sx={{alignItems: 'center'}}>
                        {newFile && <Button variant={'contained'} component={'span'} size={'large'} color={'success'}
                                            sx={{ml: 'auto'}}
                                            endIcon={<UploadFileOutlinedIcon/>} onClick={handleUploadFile}>
                            Upload file
                        </Button>}
                    </Stack>
                </Grid>
            </Grid>
        </Container>
        <hr/>

        <Container maxWidth={'xl'} sx={{my: 5}}>
            <Grid container spacing={2} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                <Grid item xs={12} md={6}>
                    <Stack direction="row" spacing={2} sx={{alignItems: 'center'}}>
                        <label htmlFor="raised-button-file">
                            <IconButton component={'span'} size={'large'}>
                                <ModelTrainingIcon fontSize="large" sx={{width: '80px', height: '80px', color: '#A1B927'}}/>
                            </IconButton>
                        </label>
                        <Typography variant={'h5'} color={'inherit'} sx={{width: '100%'}}>Choose a model</Typography>
                    </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Choose a model</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={model}
                            label="Choose a model"
                            onChange={e => setModel(e.target.value)}
                        >
                            <>
                                {models && models.map(modelItem => (
                                    <MenuItem value={modelItem}>{modelItem}</MenuItem>))}
                            </>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </Container>
        <hr/>

        {loading && <FullPageLoading/>}

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
    </div>);
}

export default LoadForecast;