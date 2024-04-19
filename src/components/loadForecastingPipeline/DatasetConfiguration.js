import React, {useEffect, useState} from 'react';
import {useKeycloak} from "@react-keycloak/web";
import axios from "axios";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {DesktopDatePicker} from "@mui/x-date-pickers/DesktopDatePicker";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import Alert from "@mui/material/Alert";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import BackspaceOutlinedIcon from "@mui/icons-material/BackspaceOutlined";
import DataThresholdingIcon from "@mui/icons-material/DataThresholding";
import DateRangeIcon from "@mui/icons-material/DateRange";
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import SchemaIcon from '@mui/icons-material/Schema';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (<div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
    >
        {value === index && (<Box sx={{p: 3}}>
            <Typography>{children}</Typography>
        </Box>)}
    </div>);
}

TabPanel.propTypes = {
    // children: PropTypes.node,
    // index: PropTypes.number.isRequired,
    // value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`, 'aria-controls': `simple-tabpanel-${index}`,
    };
}

const DatasetConfiguration = ({
                                  resetState,
                                  executionLoading,
                                  setNewFile,
                                  newFile,
                                  uploadSuccess,
                                  dayFirst,
                                  setDayFirst,
                                  experimentResolution,
                                  setExperimentResolution,
                                  multiSeriesFile,
                                  setMultiSeriesFile,
                                  removeOutliers,
                                  setRemoveOutliers,
                                  resolutions,
                                  defaultResolutionChosen,
                                  setDefaultResolutionChosen,
                                  aggregationMethod,
                                  setAggregationMethod,
                                  dateVal,
                                  minDate,
                                  maxDate,
                                  dateTest,
                                  minDateTestStart,
                                  maxDateTestStart,
                                  dateEnd,
                                  minDateEndStart,
                                  setDateVal,
                                  setDateTest,
                                  setDateEnd,
                                  setLoading,
                                  setUploadSuccess,
                                  setExecutionSuccess,
                                  setExecutionFailure,
                                  setMinDate,
                                  setMaxDate,
                                  setMaxDateTestStart,
                                  setSeriesUri,
                                  setNewFileSuccess,
                                  setNewFileFailure,
                                  setResolutions,
                                  setErrorMessage,
                                  ucChosen,
                                  setUcChosen,
                                  tsUsedID,
                                  setTsUsedId,
                                  evaluatedAllTs,
                                  setEvaluatedAllTs,
                                  imputationMethod,
                                  setImputationMethod,
                                  format,
                                  setFormat
                              }) => {
    const {keycloak} = useKeycloak()
    const [value, setValue] = useState(0);

    // Function to recognize if default resolution value is chosen
    const findDefaultNumber = (arr, numToCheck) => {
        for (let i = 0; i < arr.length; i++) {
            const obj = arr[i];
            if (obj.default === true && obj.value === numToCheck) {
                return true;
            }
        }
        return false;
    }
    const handleAddNewFile = file => setNewFile(file)
    const handleDayFirstCheckBox = () => {
        setDayFirst(!dayFirst)
    }
    const handleMultiSeriesCheckBox = () => {
        setMultiSeriesFile(!multiSeriesFile)
    }
    const handleOutliersCheckBox = () => {
        setRemoveOutliers(!removeOutliers)
    }
    const handleUploadFile = () => {
        setLoading(true)
        setUploadSuccess(false)
        setExecutionSuccess(false)
        setExecutionFailure(false)

        const data = new FormData()
        data.append('file', newFile)
        data.append('day_first', dayFirst)
        data.append('multiple', multiSeriesFile)
        data.append('format', format)

        axios.post('/upload/uploadCSVfile/', data, {
            headers: {
                "Content-Type": "multipart/form-data", "Authorization": `Bearer ${keycloak.token}`
            }
        })
            .then(response => {
                setResolutions(response.data.allowed_resolutions)
                setExperimentResolution(response.data.allowed_resolutions[0].value)
                setUploadSuccess(true)

                setTsUsedId(response.data.ts_used_id)
                setEvaluatedAllTs(response.data.evaluate_all_ts)

                // console.log(response.data.allowed_validation_start, new Date(response.data.allowed_validation_start))

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
        resetState()
    }

    const handleChange = (event, newValue) => {
        setUcChosen('')
        setValue(newValue);
        setUcConfirmation(false)
        resetState()
    };

    const handleRadioButton = event => {
        setAggregationMethod(event.target.value)
    }

    useEffect(() => {
        setDefaultResolutionChosen(findDefaultNumber(resolutions, experimentResolution))
    }, [experimentResolution])

    // Code for "CHOOSE FROM UPLOADED FILES" option
    const [ucConfirmation, setUcConfirmation] = useState(false)

    const handleChangeUseCase = (event) => {
        setUcChosen(event.target.value);
    };

    useEffect(() => {
        if (ucChosen !== '') {
            setLoading(true)
            resetState()
        }
        // ucChosen !== '' && resetState()
        let url = ''

        if (ucChosen === 'uc2') {
            url = '/db_integration/retrieve_dataset/uc2'
        }

        if (ucChosen === 'uc6') {
            url = '/db_integration/retrieve_dataset/uc6?series_name=W6 positive_active'
        }

        ucChosen !== '' && axios.get(url)
            .then(response => {
                setSeriesUri(response.data.fname)
                setLoading(false)
                console.log(response.data)
                setUcConfirmation(true)

                setResolutions(response.data.allowed_resolutions)
                setMultiSeriesFile(response.data.multiple)

                setExperimentResolution(response.data.allowed_resolutions[0].value)

                // Set MIN/MAX values for date fields
                setMinDate(new Date(response.data.allowed_validation_start))
                setMaxDate(new Date(response.data.dataset_end))
                setMaxDateTestStart(new Date(response.data.dataset_end))

                // Re-initialize date fields
                setDateVal(new Date(response.data.allowed_validation_start))
                setDateTest(new Date(new Date(response.data.allowed_validation_start).getTime() + (10 * 24 * 60 * 60 * 1000)))
                setDateEnd(new Date(response.data.dataset_end))
            })
    }, [ucChosen])

    const handleChangeFormat = event => {
        setFormat(event.target.value);
    };

    return (
        <>
            <Container maxWidth={'xl'} sx={{my: 5}} data-testid={'codelessForecastDatasetConfiguration'}>
                <Typography variant={'h4'} fontWeight={'bold'} sx={{mb: 3}}>Dataset Configuration</Typography>
                <Box sx={{width: '100%'}}>
                    <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="UPLOAD YOUR OWN FILE" {...a11yProps(0)} />
                            <Tab label="TRAIN MODELS ON I-NERGY USE CASES" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    {/* UPLOAD FILE option */}
                    <TabPanel value={value} index={0}>
                        <Grid container spacing={2} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                            <Grid item xs={12} md={4}>
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
                                                                    sx={{
                                                                        width: '60px',
                                                                        height: '60px',
                                                                        color: '#A1B927',
                                                                        mr: '-8px',
                                                                        my: 1
                                                                    }}/>
                                        </IconButton>
                                    </label>
                                    <Typography component={'span'} variant={'h5'} color={'inherit'}
                                                sx={{width: '100%'}}>
                                        Upload your .csv file
                                    </Typography>
                                </Stack>
                            </Grid>

                            <Grid item xs={12} md={8}>
                                {newFile &&
                                    <Grid container display={'flex'} flexDirection={'row'} justifyContent={'center'}>
                                        <Typography variant={'h5'} color={'inherit'} align={'right'} component={'span'}
                                                    sx={{width: '100%'}}>
                                            Chosen file:
                                            <Typography fontWeight={'bold'} component={'span'}
                                                        color={'secondary'}> {newFile.name}
                                            </Typography>
                                        </Typography>
                                    </Grid>}
                                <Stack direction="row" spacing={2}
                                       sx={{alignItems: 'center', justifyContent: 'end', mb: 2}}>
                                    <>
                                        <FormGroup>
                                            <FormControlLabel control={<Checkbox
                                                disabled={executionLoading}
                                                checked={dayFirst}
                                                onChange={handleDayFirstCheckBox}
                                                sx={{'& .MuiSvgIcon-root': {fontSize: 28}}}
                                            />} label={<Typography sx={{ml: 'auto'}} component={'span'} variant={'h6'}>
                                                Day First
                                            </Typography>}/>
                                        </FormGroup>
                                        <FormGroup>
                                            <FormControlLabel control={<Checkbox
                                                disabled={executionLoading}
                                                checked={multiSeriesFile}
                                                onChange={handleMultiSeriesCheckBox}
                                                sx={{'& .MuiSvgIcon-root': {fontSize: 28}}}
                                            />} label={<Typography sx={{ml: 'auto'}} component={'span'} variant={'h6'}>Multi
                                                Series file</Typography>}/>
                                        </FormGroup>
                                        <FormControl sx={{mb: 5}}>
                                            <Typography variant={'h6'}>Timeseries Format</Typography>
                                            <RadioGroup
                                                row
                                                value={format}
                                                onChange={handleChangeFormat}
                                            >
                                                <FormControlLabel
                                                    value="long"
                                                    control={<Radio/>}
                                                    label={<Typography variant="body1">Long</Typography>}
                                                    labelPlacement="end"
                                                />
                                                <FormControlLabel
                                                    value="short"
                                                    control={<Radio/>}
                                                    label={<Typography variant="body1">Short</Typography>}
                                                    labelPlacement="end"
                                                />
                                            </RadioGroup>
                                        </FormControl>
                                    </>
                                </Stack>
                                <Stack direction="row" spacing={2}
                                       sx={{alignItems: 'center', justifyContent: 'end', mb: 2}}>
                                    {newFile && !uploadSuccess &&
                                        <Button variant={'contained'} component={'span'} size={'large'}
                                                color={'success'}
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
                    </TabPanel>

                    {/* CHOOSE FROM UPLOADED FILES option*/}
                    <TabPanel value={value} index={1}>
                        <Grid container spacing={2} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                            <Grid item xs={12} md={8}>
                                <Stack direction="row" spacing={2} sx={{alignItems: 'center'}}>
                                    <DocumentScannerIcon fontSize="large"
                                                         sx={{
                                                             width: '60px',
                                                             height: '60px',
                                                             color: '#A1B927',
                                                             ml: 2,
                                                             my: 1
                                                         }}/>
                                    <Typography variant={'h5'} color={'inherit'} sx={{width: '100%'}}>
                                        Choose a Use Case from the dropdown
                                    </Typography>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Choose a Use Case</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Choose a Use Case"
                                        onChange={handleChangeUseCase}
                                    >
                                        <MenuItem value={'uc2'}>Use Case 2</MenuItem>
                                        <MenuItem value={'uc6'}>Use Case 6</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </TabPanel>
                </Box>

                {ucChosen === 'uc6' &&
                    <Grid container spacing={2} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                        <Grid item xs={12} md={8}>
                            <Stack direction="row" spacing={2} sx={{alignItems: 'center'}}>
                                <AppRegistrationIcon fontSize="large"
                                                     sx={{
                                                         width: '60px',
                                                         height: '60px',
                                                         color: '#A1B927',
                                                         ml: 2,
                                                         my: 1
                                                     }}/>
                                <Typography variant={'h5'} color={'inherit'} sx={{width: '100%'}}>
                                    Select Timeseries to train your model
                                </Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            {ucConfirmation && <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Select Timeseries ID</InputLabel>
                                <Select
                                    disabled={executionLoading}
                                    fullWidth
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={tsUsedID}
                                    label="Select Timeseries ID"
                                    onChange={e => setTsUsedId(e.target.value)}
                                >
                                    <MenuItem value={'W6 positive_reactive'}>W6 positive_reactive</MenuItem>
                                    <MenuItem value={'W6 positive_active'}>W6 positive_active</MenuItem>
                                    <MenuItem value={'W4 positive_reactive'}>W4 positive_reactive</MenuItem>
                                    <MenuItem value={'W4 positive_active'}>W4 positive_active</MenuItem>
                                </Select>
                            </FormControl>}
                            {(!uploadSuccess && value === 0) &&
                                <Alert severity="warning">Upload a file first to see the available
                                    resolutions!</Alert>}
                            {(!ucConfirmation && value === 1) &&
                                <Alert severity="warning">Wait until the file has been validated.</Alert>}
                        </Grid>
                    </Grid>}

                <Grid container spacing={2} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                    <Grid item xs={12} md={8}>
                        <Stack direction="row" spacing={2} sx={{alignItems: 'center'}}>
                            <DataThresholdingIcon fontSize="large"
                                                  sx={{width: '60px', height: '60px', color: '#A1B927', ml: 2, my: 1}}/>
                            <Typography variant={'h5'} color={'inherit'} sx={{width: '100%'}}>
                                Timeseries Resolution
                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        {(uploadSuccess || ucConfirmation) && <FormControl fullWidth>
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
                                {resolutions?.map(resolution => (<MenuItem key={resolution.value}
                                                                           value={resolution.value.toString()}>{resolution.value + `${findDefaultNumber(resolutions, resolution.value) ? ' (Current)' : ''}`}</MenuItem>))}
                            </Select>
                        </FormControl>}
                        {(!uploadSuccess && value === 0) &&
                            <Alert severity="warning">Upload a file first to see the available
                                resolutions!</Alert>}
                        {(!ucConfirmation && value === 1) &&
                            <Alert severity="warning">Upload select a Use Case first to see the available
                                resolutions!</Alert>}
                    </Grid>
                </Grid>

                {!defaultResolutionChosen && experimentResolution &&
                    <Grid container spacing={2} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                        <Grid item xs={12} md={4}>
                            <Stack direction="row" spacing={2} sx={{alignItems: 'center'}}>
                                <SchemaIcon fontSize="large"
                                            sx={{width: '60px', height: '60px', color: '#A1B927', ml: 2, my: 1}}/>
                                <Typography variant={'h5'} color={'inherit'} sx={{width: '100%'}}>
                                    Select Aggregation Method
                                </Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={8} sx={{display: 'flex', justifyContent: 'end', alignItems: 'end'}}>
                            <FormControl sx={{ml: 'auto'}}>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                    value={aggregationMethod}
                                    onChange={handleRadioButton}
                                >
                                    <FormControlLabel sx={{ml: 'auto'}} value="averaging" control={<Radio/>}
                                                      label={<Typography sx={{ml: 'auto'}} component={'span'}
                                                                         variant={'h6'}>Averaging</Typography>}
                                    />
                                    <FormControlLabel value="summation" control={<Radio/>}
                                                      label={<Typography sx={{ml: 'auto'}} component={'span'}
                                                                         variant={'h6'}>Summation</Typography>}
                                    />
                                    <FormControlLabel value="downsampling" control={<Radio/>}
                                                      label={<Typography sx={{ml: 'auto'}} component={'span'}
                                                                         variant={'h6'}>Downsampling</Typography>}
                                    />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid>}

                <Grid container spacing={2} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                    <Grid item xs={12} md={10}>
                        <Stack direction="row" spacing={2} sx={{alignItems: 'center'}}>
                            <SettingsSuggestIcon fontSize="large"
                                                 sx={{width: '60px', height: '60px', color: '#A1B927', ml: 2, my: 1}}/>
                            <Typography variant={'h5'} color={'inherit'} sx={{width: '100%'}}>
                                Outliers detection
                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <FormGroup>
                            <FormControlLabel
                                labelPlacement="start"
                                control={<Checkbox
                                    disabled={executionLoading}
                                    checked={removeOutliers}
                                    onChange={handleOutliersCheckBox}
                                    sx={{'& .MuiSvgIcon-root': {fontSize: 28}}}
                                />} label={<Typography sx={{ml: 'auto'}} component={'span'} variant={'h6'}>
                                Remove outliers
                            </Typography>}/>
                        </FormGroup>
                    </Grid>
                </Grid>

                <Grid container spacing={2} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                    <Grid item xs={12} md={8}>
                        <Stack direction="row" spacing={2} sx={{alignItems: 'center'}}>
                            <AutoGraphIcon fontSize="large"
                                           sx={{width: '60px', height: '60px', color: '#A1B927', ml: 2, my: 1}}/>
                            <Typography variant={'h5'} color={'inherit'} sx={{width: '100%'}}>
                                Ιnterpolation Method
                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Choose the interpolation method</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={imputationMethod}
                                disabled={executionLoading}
                                label="Choose the interpolation method"
                                onChange={e => setImputationMethod(e.target.value)}
                            >
                                <MenuItem value={'linear'}>Linear</MenuItem>
                                <MenuItem value={'time'}>Time</MenuItem>
                                <MenuItem value={'pad'}>Pad</MenuItem>
                                <MenuItem value={'nearest'}>Nearest</MenuItem>
                                <MenuItem value={'polynomial'}>Polynomial</MenuItem>
                                <MenuItem value={'spline'}>Spline</MenuItem>
                                <MenuItem value={'peppanen'}>Peppanen</MenuItem>
                                <MenuItem value={'krogh'}>Krogh</MenuItem>
                                <MenuItem value={'piecewise_polynomial'}>Piecewise Polynomial</MenuItem>
                                <MenuItem value={'spline'}>Spline</MenuItem>
                                <MenuItem value={'pchip'}>PCHIP</MenuItem>
                                {!multiSeriesFile && <MenuItem value={'akima'}>Akima</MenuItem>}
                                <MenuItem value={'cubicspline'}>Cubic Spline</MenuItem>
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
                                        disabled={executionLoading || (!uploadSuccess && !ucConfirmation)}
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
                                        disabled={executionLoading || (!uploadSuccess && !ucConfirmation)}
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
                                        disabled={executionLoading || (!uploadSuccess && !ucConfirmation)}
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
        </>);
}

export default DatasetConfiguration;