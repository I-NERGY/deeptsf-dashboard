import React, {useEffect, useState} from 'react';
import axios from "axios";
import {modelConfigurations} from "../modelConfigurations";

import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Stack from "@mui/material/Stack";
import IconButton from '@mui/material/IconButton';
import MuiAlert from '@mui/material/Alert';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';

import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';

import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TerminalIcon from '@mui/icons-material/Terminal';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
import ChevronRight from '@mui/icons-material/ChevronRight';

import Breadcrumb from "../components/layout/Breadcrumb";
import FullPageLoading from "../components/layout/FullPageLoading";

const AlertCustom = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const breadcrumbs = [
    <Link fontSize={'20px'} underline="hover" key="1" color="inherit" href="/">
        Dashboard
    </Link>, <Typography
        underline="hover"
        key="2"
        color="secondary"
        fontSize={'20px'}
        fontWeight={600}>
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
    // const [newFileSnackbar, setNewFileSnackbar] = useState(false)

    const [availableConfigurations, setAvailableConfigurations] = useState([])
    const [chosenConfiguration, setChosenConfiguration] = useState()

    const [resolutions, setResolutions] = useState([])
    // Parameter variables
    const [experimentName, setExperimentName] = useState('')
    const [experimentNameError, setExperimentNameError] = useState(false)
    const [experimentResolution, setExperimentResolution] = useState('')
    const [experimentResolutionError, setExperimentResolutionError] = useState(false)

    const [dateVal, setDateVal] = useState(null)
    const [dateTest, setDateTest] = useState(null)
    const [dateEnd, setDateEnd] = useState(null)
    const [forecastHorizon, setForecastHorizon] = useState(24)
    const [ignorePrevious, setIgnorePrevious] = useState(true)

    useEffect(() => {
        axios.get('/experimentation_pipeline/etl/get_resolutions/')
            .then(response => setResolutions(response.data.resolution))
    }, [])

    useEffect(() => {
        if (dateVal) {
            const offset = dateVal.getTimezoneOffset()
            console.log(new Date(dateVal.getTime() - (offset * 60 * 1000)).toISOString().split('T')[0])
        }
    }, [dateVal])

    useEffect(() => {
        axios.get('/models/get_model_names')
            .then(response => setModels(response.data.models))
            .catch(error => console.log(error))
    }, [])

    const handleAddNewFile = file => {
        setNewFile(file)
    }

    const handleUploadFile = () => {
        setLoading(true)
        const data = new FormData()

        data.append('file', newFile)

        axios.post('/upload/uploadCSVfile/', data, {headers: {"Content-Type": "multipart/form-data"}})
            .then(response => {
                const payload = {
                    fname: response.data.fname, day_first: dayFirst,
                }
                axios.post('/upload/validateCSVfile/', payload)
                    .then(response => {
                        // setNewFileSnackbar(true)
                        setNewFileSuccess(true)
                        setNewFileFailure(false)
                        setNewFile(null)
                        setLoading(false)
                        document.getElementById('raised-button-file').value = ''
                    })
                    .catch(error => {
                        setLoading(false)
                        // setNewFileSnackbar(true)
                        setNewFileSuccess(false)
                        setNewFileFailure(true)
                        setNewFile(null)
                        document.getElementById('raised-button-file').value = ''
                        console.log(error)
                    })
            })
            .catch(error => {
                setLoading(false)
                // setNewFileSnackbar(true)
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

    useEffect(() => {
        let myArray = Object.entries(modelConfigurations)
        const myArrayFiltered = myArray.filter(element => (element[0].includes(model)))
        setAvailableConfigurations(myArrayFiltered)
        setChosenConfiguration('')
    }, [model])

    const handleChooseConfiguration = index => {
        setChosenConfiguration(index)
    }

    const handleExecute = () => {

    }

    return (<div>
        <Breadcrumb breadcrumbs={breadcrumbs} welcome_msg={'Welcome to I-NERGY Load Forecasting'}/>

        {/* Upload your .csv file */}
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
                                <UploadFileOutlinedIcon fontSize="large"
                                                        sx={{width: '80px', height: '80px', color: '#A1B927'}}/>
                            </IconButton>
                        </label>
                        <Typography variant={'h4'} color={'inherit'} sx={{width: '100%'}}>
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

        {/* Choose a model */}
        <Container maxWidth={'xl'} sx={{my: 5}}>
            <Grid container spacing={2} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                <Grid item xs={12} md={6}>
                    <Stack direction="row" spacing={2} sx={{alignItems: 'center'}}>
                        <IconButton component={'span'} size={'large'}>
                            <ModelTrainingIcon fontSize="large" sx={{width: '80px', height: '80px', color: '#A1B927'}}/>
                        </IconButton>
                        <Typography variant={'h4'} color={'inherit'} sx={{width: '100%'}}>Choose a model</Typography>
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
                            {models && models.map(modelItem => (
                                <MenuItem key={modelItem} value={modelItem}>{modelItem}</MenuItem>))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </Container>
        <hr/>

        {/* Select Configuration */}
        <Container maxWidth={'xl'} sx={{my: 5}}>
            <Grid container spacing={2} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                <Grid item xs={12} md={6}>
                    <Stack direction="row" spacing={2} sx={{alignItems: 'center'}}>
                        <IconButton component={'span'} size={'large'}>
                            <SettingsApplicationsIcon fontSize="large"
                                                      sx={{width: '80px', height: '80px', color: '#A1B927'}}/>
                        </IconButton>
                        <Typography variant={'h4'} color={'inherit'} sx={{width: '100%'}}>Select
                            Configuration</Typography>
                    </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                    {!model && <Alert severity="warning">Choose a model to see the available configurations!</Alert>}
                </Grid>
            </Grid>

            <Grid container spacing={2} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                {model && availableConfigurations && availableConfigurations.map(config => (
                    <Grid item xs={6} md={2} key={config[0]}>
                        <Card elevation={chosenConfiguration === availableConfigurations.indexOf(config) ? 10 : 1}
                              onClick={() => handleChooseConfiguration(availableConfigurations.indexOf(config))}
                              sx={{background: chosenConfiguration === availableConfigurations.indexOf(config) ? '#ACBF5D' : ''}}>
                            <CardContent>
                                <Stack direction={'row'}>
                                    <Typography variant={'h6'} gutterBottom>
                                        {config[0]}
                                    </Typography>
                                    {chosenConfiguration === availableConfigurations.indexOf(config) &&
                                        <CheckCircleIcon color={'success'} sx={{ml: 'auto'}}/>}
                                </Stack>

                                <hr style={{borderBottom: 0}}/>

                                {Object.entries(config[1]).map(([parameterName, parameterValue]) => {
                                    return (<Typography variant={'subtitle2'}>
                                        <span style={{fontWeight: 'bold'}}>{parameterName}</span>: {parameterValue}
                                    </Typography>);
                                })}
                            </CardContent>
                        </Card>
                    </Grid>))}
                {availableConfigurations.length === 0 &&
                    <Container maxWidth={'lg'} sx={{my: 4}}>
                        <Alert severity="error">No available configurations for this model!</Alert>
                    </Container>}
            </Grid>
        </Container>
        <hr/>

        {/* Select Parameters */}
        <Container maxWidth={'xl'} sx={{my: 5}}>
            <Grid container spacing={2} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                <Grid item xs={12} md={6}>
                    <Stack direction="row" spacing={2} sx={{alignItems: 'center'}}>
                        <IconButton component={'span'} size={'large'}>
                            <SettingsEthernetIcon fontSize="large"
                                                  sx={{width: '80px', height: '80px', color: '#A1B927'}}/>
                        </IconButton>
                        <Typography variant={'h4'} color={'inherit'} sx={{width: '100%'}}>Select
                            Parameters</Typography>
                    </Stack>
                </Grid>
                <Grid item xs={12} md={6}></Grid>
            </Grid>

            <Container>
                <Grid container spacing={2} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                    <Grid item xs={12} md={4}>
                        <TextField id="outlined-basic" label="Experiment name" variant="outlined" required fullWidth
                                   value={experimentName} error={experimentNameError && experimentName === ''}/>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Experiment Resolution</InputLabel>
                            <Select
                                fullWidth
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={experimentResolution}
                                label="Experiment Resolution"
                                onChange={e => setExperimentResolution(e.target.value)}
                            >
                                {resolutions.map(resolution => (
                                    <MenuItem key={resolution} value={resolution}>{resolution}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField id="outlined-basic" label="Forecast Horizon" variant="outlined" required fullWidth
                                   value={forecastHorizon} type="number"
                                   onChange={e => setForecastHorizon(e.target.value)}
                                   InputProps={{inputProps: {min: 0}}}
                        />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                views={['day']}
                                label="Date Val"
                                value={dateVal}
                                onChange={(newValue) => {
                                    setDateVal(newValue);
                                }}
                                renderInput={(params) => <TextField fullWidth {...params} helperText={null}/>}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                views={['day']}
                                label="Date Test"
                                value={dateTest}
                                onChange={(newValue) => {
                                    setDateTest(newValue);
                                }}
                                renderInput={(params) => <TextField fullWidth {...params} helperText={null}/>}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                views={['day']}
                                label="Date End"
                                value={dateEnd}
                                onChange={(newValue) => {
                                    setDateEnd(newValue);
                                }}
                                renderInput={(params) => <TextField fullWidth {...params} helperText={null}/>}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ml: 'auto'}} display={'flex'} alignItems={'center'}>
                        <Typography sx={{ml: 'auto'}} variant={'body1'}>Ignore Previous Runs</Typography>
                        <Checkbox
                            value={ignorePrevious}
                            onChange={() => setIgnorePrevious(!ignorePrevious)}
                            sx={{'& .MuiSvgIcon-root': {fontSize: 28}}}
                        />
                    </Grid>
                </Grid>
            </Container>
        </Container>
        <hr/>

        {/* Run the model */}
        <Container maxWidth={'xl'} sx={{my: 5}}>
            <Grid container spacing={2} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                <Grid item xs={12} md={6}>
                    <Stack direction="row" spacing={2} sx={{alignItems: 'center'}}>
                        <IconButton component={'span'} size={'large'}>
                            <TerminalIcon fontSize="large"
                                          sx={{width: '80px', height: '80px', color: '#A1B927'}}/>
                        </IconButton>
                        <Typography variant={'h4'} color={'inherit'} sx={{width: '100%'}}>Run the model</Typography>
                    </Stack>
                </Grid>
                <Grid item xs={12} md={6} display={'flex'}>
                    <Button variant={'contained'} component={'span'} size={'large'} color={'success'}
                            sx={{ml: 'auto'}} fullWidth
                            endIcon={<ChevronRight/>} onClick={handleExecute}>
                        <Typography variant={'h6'}>EXECUTE</Typography>
                    </Button>
                </Grid>
            </Grid>
        </Container>

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