import React, {useEffect, useState} from 'react';
import axios from "axios";
import useAuthContext from "../hooks/useAuthContext";
import {useNavigate} from "react-router-dom";

// import {modelConfigurations} from "../modelConfigurations";

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
import DatasetConfiguration from "../components/loadForecastingPipeline/DatasetConfiguration";
import ModelTrainingSetup from "../components/loadForecastingPipeline/ModelTrainingSetup";

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
        axios.get('/experimentation_pipeline/training/hyperparameter_entrypoints')
            .then(response => {
                let myArray = Object.entries(response.data)
                const myArrayFiltered = myArray.filter(element => (element[0].includes(model.search_term)))
                setAvailableConfigurations(myArrayFiltered)
                setChosenConfiguration('')
            })
            .catch(error => console.log(error))

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
        <Breadcrumb breadcrumbs={breadcrumbs} welcome_msg={''}/>

        {allowed && <React.Fragment>
            {/* Dataset Configuration */}
            <DatasetConfiguration
                executionLoading={executionLoading}
                handleAddNewFile={handleAddNewFile}
                newFile={newFile}
                uploadSuccess={uploadSuccess}
                dayFirst={dayFirst}
                handleDayFirstCheckBox={handleDayFirstCheckBox}
                handleUploadFile={handleUploadFile}
                handleClearNewFile={handleClearNewFile}
                experimentResolution={experimentResolution}
                setExperimentResolution={setExperimentResolution}
                resolutions={resolutions}
                dateVal={dateVal}
                minDate={minDate}
                maxDate={maxDate}
                dateTest={dateTest}
                minDateTestStart={minDateTestStart}
                maxDateTestStart={maxDateTestStart}
                dateEnd={dateEnd}
                minDateEndStart={minDateEndStart}
                setDateVal={setDateVal}
                setDateTest={setDateTest}
                setDateEnd={setDateEnd}
            />
            <hr/>

            {/* Model Training Setup */}
            <ModelTrainingSetup
                experimentName={experimentName}
                experimentNameError={experimentNameError}
                setExperimentName={setExperimentName}
                executionLoading={executionLoading}
                ignorePrevious={ignorePrevious}
                handleIgnoreFirstCheckBox={handleIgnoreFirstCheckBox}
                model={model}
                setModel={setModel}
                models={models}
                availableConfigurations={availableConfigurations}
                chosenConfiguration={chosenConfiguration}
                handleChooseConfiguration={handleChooseConfiguration}
            />
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
                Execution initiated!
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