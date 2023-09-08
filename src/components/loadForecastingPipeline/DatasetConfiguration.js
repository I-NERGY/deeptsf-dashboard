import React, {useState} from 'react';
import {useKeycloak} from "@react-keycloak/web";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import BackspaceOutlinedIcon from "@mui/icons-material/BackspaceOutlined";
import DataThresholdingIcon from "@mui/icons-material/DataThresholding";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import DateRangeIcon from "@mui/icons-material/DateRange";
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {DesktopDatePicker} from "@mui/x-date-pickers/DesktopDatePicker";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import axios from "axios";

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    // children: PropTypes.node,
    // index: PropTypes.number.isRequired,
    // value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const DatasetConfiguration = ({
                                  executionLoading,
                                  setNewFile,
                                  newFile,
                                  uploadSuccess,
                                  dayFirst,
                                  setDayFirst,
                                  experimentResolution,
                                  setExperimentResolution,
                                  resolutions,
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
                                  setErrorMessage
                              }) => {
    const {keycloak} = useKeycloak()
    const [value, setValue] = useState(0);

    const handleAddNewFile = file => setNewFile(file)
    const handleDayFirstCheckBox = () => {
        setDayFirst(!dayFirst)
    }
    const handleUploadFile = () => {
        setLoading(true)
        setUploadSuccess(false)
        setExecutionSuccess(false)
        setExecutionFailure(false)

        const data = new FormData()
        data.append('file', newFile)
        data.append('day_first', dayFirst)

        axios.post('/upload/uploadCSVfile/', data, {headers: {"Content-Type": "multipart/form-data", "Authorization": `Bearer ${keycloak.token}`}})
            .then(response => {
                setResolutions(response.data.allowed_resolutions)
                setUploadSuccess(true)

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

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <Container maxWidth={'xl'} sx={{my: 5}} data-testid={'codelessForecastDatasetConfiguration'}>
                <Typography variant={'h4'} fontWeight={'bold'} sx={{mb: 3}}>Dataset Configuration</Typography>
                <Box sx={{width: '100%'}}>
                    <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="UPLOAD YOUR OWN FILE" {...a11yProps(0)} />
                            <Tab label="CHOOSE FROM UPLOADED FILES" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
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

                            <Grid item xs={12} md={4}>
                                {newFile &&
                                    <Grid container display={'flex'} flexDirection={'row'} justifyContent={'center'}>
                                        <Typography variant={'h5'} color={'inherit'} align={'right'} component={'span'}
                                                    sx={{width: '100%'}}>
                                            Chosen file:
                                            <Typography fontWeight={'bold'} component={'span'}
                                                        color={'secondary'}>{newFile.name}
                                            </Typography>
                                        </Typography>
                                    </Grid>}
                                <Stack direction="row" spacing={2} sx={{alignItems: 'center', mb: 2}}>
                                    {newFile && !uploadSuccess && <>
                                        <Typography sx={{ml: 'auto'}} component={'span'} variant={'h6'}>Day
                                            First</Typography>
                                        <Checkbox
                                            disabled={executionLoading}
                                            checked={dayFirst}
                                            onChange={handleDayFirstCheckBox}
                                            sx={{'& .MuiSvgIcon-root': {fontSize: 28}}}
                                        />
                                    </>}
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
                                        Choose a file from the dropdown
                                    </Typography>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Choose a file</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        // value={age}
                                        label="Choose a file"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={10}>Placeholder 1</MenuItem>
                                        <MenuItem value={20}>Placeholder 2</MenuItem>
                                        <MenuItem value={30}>Placeholder 3</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </TabPanel>
                </Box>

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
        </>
    );
}

export default DatasetConfiguration;