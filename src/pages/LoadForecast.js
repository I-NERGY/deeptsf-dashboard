import React, {useEffect, useState} from 'react';
import axios from "axios";
import useAuthContext from "../hooks/useAuthContext";
import {useNavigate} from "react-router-dom";

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
import CircularProgress from '@mui/material/CircularProgress';

import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DesktopDatePicker} from '@mui/x-date-pickers/DesktopDatePicker';

import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TerminalIcon from '@mui/icons-material/Terminal';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import ChevronRight from '@mui/icons-material/ChevronRight';
import DataThresholdingIcon from '@mui/icons-material/DataThresholding';
import DateRangeIcon from '@mui/icons-material/DateRange';
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import LineAxisOutlinedIcon from '@mui/icons-material/LineAxisOutlined';
import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined';

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
    const {roles} = useAuthContext()
    const navigate = useNavigate();
    const [allowed, setAllowed] = useState(null)
    const [newFile, setNewFile] = useState()
    const [dayFirst, setDayFirst] = useState(false)
    const [models, setModels] = useState([])
    const [model, setModel] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const [loading, setLoading] = useState(false)
    const [executionLoading, setExecutionLoading] = useState(false)
    const [executionInitiated, setExecutionInitiated] = useState(false)
    const [uploadSuccess, setUploadSuccess] = useState(false)
    const [newFileSuccess, setNewFileSuccess] = useState(false)
    const [newFileFailure, setNewFileFailure] = useState(false)
    const [executionSuccess, setExecutionSuccess] = useState(false)
    const [executionFailure, setExecutionFailure] = useState(false)

    const [availableConfigurations, setAvailableConfigurations] = useState([])
    const [chosenConfiguration, setChosenConfiguration] = useState('')

    const [resolutions, setResolutions] = useState([])

    const [maxDate, setMaxDate] = useState(null)
    const [minDate, setMinDate] = useState(null)
    const [minDateTestStart, setMinDateTestStart] = useState(null)
    const [maxDateTestStart, setMaxDateTestStart] = useState(null)
    const [minDateEndStart, setMinDateEndStart] = useState(null)

    // Parameter variables
    const [experimentName, setExperimentName] = useState('')
    const [experimentNameError, setExperimentNameError] = useState(false)
    const [experimentResolution, setExperimentResolution] = useState('')

    const [dateVal, setDateVal] = useState(null)
    const [dateTest, setDateTest] = useState(null)
    const [dateEnd, setDateEnd] = useState(null)
    const [forecastHorizon, setForecastHorizon] = useState(24)
    const [ignorePrevious, setIgnorePrevious] = useState(true)
    const [seriesUri, setSeriesUri] = useState('')

    // useEffect(() => {
    //     axios.get('get_mlflow_tracking_uri').then(response => console.log(response.data))
    // }, [])

    useEffect(() => {
        if (roles) {
            (roles.includes('data_scientist') || roles.includes('inergy_admin')) ? setAllowed(true) : navigate('/')
        }
    }, [roles])

    useEffect(() => {
        axios.get('/models/get_model_names')
            .then(response => setModels(response.data))
            .catch(error => console.log(error))
    }, [])

    useEffect(() => {
        setForecastHorizon(Math.floor(288 / (experimentResolution / 5)))
    }, [experimentResolution])

    useEffect(() => {
        let myArray = Object.entries(modelConfigurations)
        const myArrayFiltered = myArray.filter(element => (element[0].includes(model.search_term)))
        setAvailableConfigurations(myArrayFiltered)
        setChosenConfiguration('')
    }, [model])

    useEffect(() => {
        dateVal && setMinDateTestStart(new Date(dateVal.getFullYear(), dateVal.getMonth(), dateVal.getDate() + 10))
    }, [dateVal])

    useEffect(() => {
        dateTest && setMinDateEndStart(new Date(dateTest.getFullYear(), dateTest.getMonth(), dateTest.getDate() + 10))
    }, [dateTest])

    useEffect(() => {
        dateTest && (dateTest < minDateTestStart) && setDateTest(null)
    }, [minDateTestStart])

    useEffect(() => {
        dateEnd && (dateEnd < minDateEndStart) && setDateEnd(null)
    }, [minDateEndStart])

    const handleAddNewFile = file => setNewFile(file)

    const handleUploadFile = () => {
        setLoading(true)
        setUploadSuccess(false)
        setExecutionSuccess(false)
        setExecutionFailure(false)

        const data = new FormData()
        data.append('file', newFile)
        data.append('day_first', dayFirst)

        axios.post('/upload/uploadCSVfile/', data, {headers: {"Content-Type": "multipart/form-data"}})
            .then(response => {
                console.log(response.data)
                setResolutions(response.data.allowed_resolutions)
                setUploadSuccess(true)

                console.log(response.data.allowed_validation_start, new Date(response.data.allowed_validation_start))
                // Set MIN/MAX values for date fields
                setMinDate(new Date(response.data.allowed_validation_start))
                setMaxDate(new Date(response.data.dataset_end))
                setMaxDateTestStart(new Date(response.data.dataset_end))

                // Re-initialize date fields
                setDateVal(new Date(response.data.allowed_validation_start))
                setDateTest(new Date(new Date(response.data.allowed_validation_start).getTime() + (10 * 24 * 60 * 60 * 1000)))
                setDateEnd(new Date(response.data.dataset_end))

                setSeriesUri(response.data.fname)

                setNewFileSuccess(true)
                setNewFileFailure(false)
                setLoading(false)
                document.getElementById('raised-button-file').value = ''
            })
            .catch(error => {
                // TODO Fixes error handling
                error.response?.status === 415 && setErrorMessage(error.response.data.detail)
                setLoading(false)
                setNewFileSuccess(false)
                setNewFileFailure(true)
                setNewFile(null)
                document.getElementById('raised-button-file').value = ''
                console.log(error)
            })
    }

    const handleClearNewFile = () => {
        setNewFile('')
        setUploadSuccess(false)
        // Set MIN/MAX values for date fields
        setMinDate(null)
        setMaxDate(null)
        setMaxDateTestStart(null)

        // Re-initialize date fields
        setDateVal(null)
        setDateTest(null)
        setDateEnd(null)

        setSeriesUri('')

        setNewFileSuccess(false)
        setNewFileFailure(false)
    }

    const closeSnackbar = () => {
        setNewFileSuccess(false)
        setNewFileFailure(false)

        setExecutionSuccess(false)
        setExecutionFailure(false)
    }

    const handleChooseConfiguration = index => {
        setChosenConfiguration(index)
    }

    const handleDayFirstCheckBox = () => {
        setDayFirst(!dayFirst)
    }
    const handleIgnoreFirstCheckBox = () => {
        setIgnorePrevious(!ignorePrevious)
    }

    const handleExecute = () => {
        setExecutionLoading(true)
        setExecutionInitiated(true)
        setExecutionSuccess(false)
        setExecutionFailure(false)

        const payload = {
            series_csv: seriesUri,
            experiment_name: experimentName,
            resolution: experimentResolution,
            validation_start_date: new Date(dateVal.getTime() - (dateVal.getTimezoneOffset() * 60 * 1000)).toISOString().split('T')[0].replace(/-/g, ""),
            test_start_date: new Date(dateTest.getTime() - (dateTest.getTimezoneOffset() * 60 * 1000)).toISOString().split('T')[0].replace(/-/g, ""),
            test_end_date: new Date(dateEnd.getTime() - (dateEnd.getTimezoneOffset() * 60 * 1000)).toISOString().split('T')[0].replace(/-/g, ""),
            model: model.model_name,
            forecast_horizon: forecastHorizon,
            hyperparams_entrypoint: availableConfigurations[chosenConfiguration][0],
            ignore_previous_runs: ignorePrevious
        }

        console.log(payload)

        axios.post('/experimentation_pipeline/run_all', payload)
            .then(response => {
                console.log(response.data)
                setExecutionSuccess(true)
                setExecutionFailure(false)
                setExecutionLoading(false)
            })
            .catch(error => {
                console.log(error)
                setExecutionFailure(true)
                setExecutionSuccess(false)
                setExecutionLoading(false)
            })
    }

    return (<div>
        <Breadcrumb breadcrumbs={breadcrumbs} welcome_msg={'Welcome to I-NERGY Load Forecasting'}/>

        {allowed && <React.Fragment>
            {/* Dataset Configuration */}
            <Container maxWidth={'xl'} sx={{my: 5}}>
                <Typography variant={'h4'} fontWeight={'bold'} sx={{mb: 3}}>Dataset Configuration</Typography>
                <Grid container spacing={2} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                    <Grid item xs={12} md={8}>
                        <input
                            accept=".csv"
                            style={{display: 'none'}}
                            id="raised-button-file"
                            type="file"
                            disabled={executionLoading}
                            onChange={(event) => handleAddNewFile(event.target.files[0])}
                        />

                        <Stack direction="row" spacing={2} sx={{alignItems: 'center'}}>
                            <label htmlFor="raised-button-file">
                                <IconButton component={'span'} size={'large'}>
                                    <UploadFileOutlinedIcon fontSize="large"
                                                            sx={{width: '60px', height: '60px', color: '#A1B927'}}/>
                                </IconButton>
                            </label>
                            <Typography variant={'h5'} color={'inherit'} sx={{width: '100%'}}>
                                Upload your .csv file
                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        {newFile &&
                            <Grid container display={'flex'} flexDirection={'row'} justifyContent={'center'}>
                                <Typography variant={'h5'} color={'inherit'} align={'right'} sx={{width: '100%'}}>
                                    Chosen file:
                                    <Typography fontWeight={'bold'}
                                                color={'secondary'}>{newFile.name}
                                    </Typography>
                                </Typography>
                            </Grid>}
                        <Stack direction="row" spacing={2} sx={{alignItems: 'center', mb: 2}}>
                            {newFile && !uploadSuccess && <>
                                <Typography sx={{ml: 'auto'}} variant={'h6'}>Day First</Typography>
                                <Checkbox
                                    disabled={executionLoading}
                                    checked={dayFirst}
                                    onChange={handleDayFirstCheckBox}
                                    sx={{'& .MuiSvgIcon-root': {fontSize: 28}}}
                                />
                            </>}
                            {newFile && !uploadSuccess &&
                                <Button variant={'contained'} component={'span'} size={'large'} color={'success'}
                                        sx={{ml: 'auto'}} disabled={executionLoading}
                                        endIcon={<UploadFileOutlinedIcon/>} onClick={handleUploadFile}>
                                    Upload file
                                </Button>}
                            {uploadSuccess &&
                                <Button variant={'contained'} component={'span'} size={'medium'} color={'error'}
                                        endIcon={<BackspaceOutlinedIcon/>} sx={{ml: 'auto'}}
                                        onClick={handleClearNewFile}>
                                    Clear
                                </Button>}
                        </Stack>
                    </Grid>
                </Grid>
                <Grid container spacing={2} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                    <Grid item xs={12} md={8}>
                        <Stack direction="row" spacing={2} sx={{alignItems: 'center'}}>
                            <DataThresholdingIcon fontSize="large"
                                                  sx={{width: '60px', height: '60px', color: '#A1B927', ml: 2, my: 1}}/>
                            <Typography variant={'h5'} color={'inherit'} sx={{width: '100%'}}>
                                Select Timeseries Resolution
                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Dataset Resolution (Minutes)</InputLabel>
                            <Select
                                disabled={executionLoading}
                                fullWidth
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={experimentResolution}
                                label="Dataset Resolution (Minutes)"
                                onChange={e => setExperimentResolution(e.target.value)}
                            >
                                {resolutions?.map(resolution => (
                                    <MenuItem key={resolution.value}
                                              value={resolution.value.toString()}>{resolution.display_value}</MenuItem>))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container spacing={2} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                    <Grid item xs={12} md={6}>
                        <Stack direction="row" spacing={2} sx={{alignItems: 'center'}}>
                            <DateRangeIcon fontSize="large"
                                           sx={{width: '60px', height: '60px', color: '#A1B927', ml: 2, my: 1}}/>
                            <Typography variant={'h5'} color={'inherit'} sx={{width: '100%'}}>Dataset Split</Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Grid container spacing={2} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                            <Grid item xs={12} md={4}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DesktopDatePicker
                                        disabled={executionLoading || !uploadSuccess}
                                        inputFormat="dd/MM/yyyy"
                                        label="Validation Start Date"
                                        value={dateVal}
                                        minDate={minDate ? minDate : void (0)}
                                        maxDate={maxDate ? maxDate : void (0)}
                                        onChange={(newValue) => {
                                            setDateVal(newValue);
                                        }}
                                        renderInput={(params) => <TextField fullWidth {...params}/>}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DesktopDatePicker
                                        disabled={executionLoading || !uploadSuccess}
                                        inputFormat="dd/MM/yyyy"
                                        label="Test Start Date"
                                        value={dateTest}
                                        minDate={minDateTestStart ? minDateTestStart : void (0)}
                                        maxDate={maxDateTestStart ? maxDateTestStart : void (0)}
                                        onChange={(newValue) => {
                                            setDateTest(newValue);
                                        }}
                                        renderInput={(params) => <TextField fullWidth {...params} helperText={null}/>}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DesktopDatePicker
                                        disabled={executionLoading || !uploadSuccess}
                                        inputFormat="dd/MM/yyyy"
                                        label="Test End Date"
                                        value={dateEnd}
                                        minDate={minDateEndStart ? minDateEndStart : void (0)}
                                        maxDate={maxDate ? maxDate : void (0)}
                                        onChange={(newValue) => {
                                            setDateEnd(newValue);
                                        }}
                                        renderInput={(params) => <TextField fullWidth {...params} helperText={null}/>}
                                    />
                                </LocalizationProvider>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
            <hr/>

            {/* Model Training Setup */}
            <Container maxWidth={'xl'} sx={{my: 5}}>
                <Typography variant={'h4'} fontWeight={'bold'} sx={{mb: 3}}>Model Training Setup</Typography>
                <Grid container spacing={2} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                    <Grid item xs={12} md={6}>
                        <Stack direction="row" spacing={2} sx={{alignItems: 'center'}}>
                            <LabelOutlinedIcon fontSize="large"
                                               sx={{width: '60px', height: '60px', color: '#A1B927', ml: 2, my: 1}}/>
                            <Typography variant={'h5'} color={'inherit'} sx={{width: '100%'}}>MLFlow Experiment
                                Name</Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Grid container spacing={2} display={'flex'} alignItems={'center'}>
                            <Grid item xs={6} md={8}>
                                <TextField id="outlined-basic" label="Experiment name" variant="outlined" required
                                           fullWidth
                                           value={experimentName} error={experimentNameError && experimentName === ''}
                                           onChange={e => setExperimentName(e.target.value)}
                                           disabled={executionLoading}/>
                            </Grid>
                            <Grid item xs={6} md={4} display={'flex'} alignItems={'center'}>
                                <Typography sx={{ml: 'auto'}} variant={'body1'} fontWeight={'bold'}>Ignore Previous
                                    Runs</Typography>
                                <Checkbox
                                    checked={ignorePrevious} disabled={executionLoading}
                                    onChange={handleIgnoreFirstCheckBox}
                                    sx={{'& .MuiSvgIcon-root': {fontSize: 28}}}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container spacing={2} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                    <Grid item xs={12} md={6}>
                        <Stack direction="row" spacing={2} sx={{alignItems: 'center'}}>
                            <ModelTrainingIcon fontSize="large"
                                               sx={{width: '60px', height: '60px', color: '#A1B927', ml: 2, my: 1}}/>
                            <Typography variant={'h5'} color={'inherit'} sx={{width: '100%'}}>Choose a
                                model</Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Choose a model</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={model}
                                disabled={executionLoading}
                                label="Choose a model"
                                onChange={e => setModel(e.target.value)}
                            >
                                {models && models.map(modelItem => (
                                    <MenuItem key={modelItem.model_name}
                                              value={modelItem}>{modelItem.model_name}</MenuItem>))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container spacing={2} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                    <Grid item xs={12} md={6}>
                        <Stack direction="row" spacing={2} sx={{alignItems: 'center'}}>
                            <SettingsApplicationsIcon fontSize="large"
                                                      sx={{
                                                          width: '60px',
                                                          height: '60px',
                                                          color: '#A1B927',
                                                          ml: 2,
                                                          my: 1
                                                      }}/>
                            <Typography variant={'h5'} color={'inherit'} sx={{width: '100%'}}>
                                Select Hyperparameters</Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        {!model &&
                            <Alert severity="warning">Choose a model to see the available configurations!</Alert>}
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
                    {model && availableConfigurations.length === 0 && <Container maxWidth={'lg'} sx={{my: 4}}>
                        <Alert severity="error">No available configurations for this model!</Alert>
                    </Container>}
                </Grid>
            </Container>
            <hr/>

            {/* Model Evaluation Setup */}
            <Container maxWidth={'xl'} sx={{my: 5}}>
                <Typography variant={'h4'} fontWeight={'bold'} sx={{mb: 3}}>Model Evaluation Setup</Typography>
                <Grid container spacing={2} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                    <Grid item xs={12} md={6}>
                        <Stack direction="row" spacing={2} sx={{alignItems: 'center'}}>
                            <LineAxisOutlinedIcon fontSize="large"
                                                  sx={{width: '60px', height: '60px', color: '#A1B927', ml: 2, my: 1}}/>
                            <Typography variant={'h5'} color={'inherit'} sx={{width: '100%'}}>Choose Backtest Forecast
                                Horizon</Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField id="outlined-basic" label="Forecast Horizon" variant="outlined" required fullWidth
                                   value={forecastHorizon} type="number"
                                   disabled={executionLoading}
                                   onChange={e => setForecastHorizon(e.target.value)}
                                   InputProps={{inputProps: {min: 0}}}
                        />
                    </Grid>
                </Grid>
            </Container>
            <hr/>

            {/* Experiment Execution */}
            <Container maxWidth={'xl'} sx={{my: 5}}>
                <Typography variant={'h4'} fontWeight={'bold'} sx={{mb: 3}}>Experiment Execution</Typography>
                <Grid container spacing={2} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                    <Grid item xs={12} md={6}>
                        <Stack direction="row" spacing={2} sx={{alignItems: 'center'}}>
                            <TerminalIcon fontSize="large"
                                          sx={{width: '60px', height: '60px', color: '#A1B927', ml: 2, my: 1}}/>
                            <Typography variant={'h5'} color={'inherit'} sx={{width: '100%'}}>Run the model</Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={6} display={'flex'}>
                        <Button variant={'contained'} component={'span'} size={'large'} color={'success'}
                                sx={{ml: 'auto'}} fullWidth
                                endIcon={<ChevronRight/>} onClick={handleExecute}
                                disabled={executionLoading || !uploadSuccess || !experimentResolution || !dateVal || !dateTest || !dateEnd || !experimentName || !model || chosenConfiguration === '' || !forecastHorizon}
                        >
                            <Typography variant={'h5'}>
                                EXECUTE {executionLoading && <CircularProgress size={'26px'} sx={{color: 'white'}}/>}
                            </Typography>
                        </Button>
                    </Grid>
                </Grid>
                {executionInitiated &&
                    <Grid container spacing={2} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                        <Grid item xs={12} md={6}>
                            <Stack direction="row" spacing={2} sx={{alignItems: 'center'}}>
                                <DoneAllIcon fontSize="large"
                                             sx={{width: '60px', height: '60px', color: '#A1B927', ml: 2, my: 1}}/>
                                <Typography variant={'h5'} color={'inherit'} sx={{width: '100%'}}>Results</Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={6} display={'flex'}>
                            <Button variant={'contained'} component={'span'} size={'large'} color={'warning'}
                                    sx={{ml: 'auto'}} fullWidth
                                    endIcon={<ChevronRight/>}
                                    onClick={() => window.open('http://131.154.97.48:5000/', '_blank')}
                            >
                                <Typography variant={'h6'}>Visit MLFlow Server</Typography>
                            </Button>
                        </Grid>
                    </Grid>}
            </Container>
        </React.Fragment>}

        {loading && <FullPageLoading/>}
        <Snackbar open={newFileSuccess} autoHideDuration={3000} onClose={closeSnackbar}>
            <AlertCustom onClose={closeSnackbar} severity="success" sx={{width: '100%', mb: 5}}>
                The new file has been successfully uploaded!
            </AlertCustom>
        </Snackbar>
        <Snackbar open={newFileFailure} autoHideDuration={3000} onClose={closeSnackbar}>
            <AlertCustom onClose={closeSnackbar} severity="error" sx={{width: '100%', mb: 5}}>
                {errorMessage}
            </AlertCustom>
        </Snackbar>

        <Snackbar open={executionSuccess} autoHideDuration={3000} onClose={closeSnackbar}>
            <AlertCustom onClose={closeSnackbar} severity="success" sx={{width: '100%', mb: 5}}>
                Execution successful!
            </AlertCustom>
        </Snackbar>
        <Snackbar open={executionFailure} autoHideDuration={3000} onClose={closeSnackbar}>
            <AlertCustom onClose={closeSnackbar} severity="error" sx={{width: '100%', mb: 5}}>
                Something went wrong with the execution! Please try again!
            </AlertCustom>
        </Snackbar>
    </div>);
}

export default LoadForecast;