import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Alert from "@mui/material/Alert";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Container from "@mui/material/Container";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import ModelTrainingIcon from "@mui/icons-material/ModelTraining";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {useEffect} from "react";

const ModelTrainingSetup = ({
                                experimentName,
                                experimentNameError,
                                setExperimentName,
                                executionLoading,
                                ignorePrevious,
                                model,
                                setModel,
                                models,
                                experimentResolution,
                                // availableConfigurations,
                                chosenConfiguration,
                                hyperParams,
                                setHyperParams,
                                setChosenConfiguration,
                                setIgnorePrevious
                            }) => {

    const transformArrayToObject = arr => {
        const result = {};
        for (const item of arr) {
            result[item.name] = item.default
        }
        return result;
    }

    const handleChange = (event, index, param) => {
        const {value} = event.target;
        const updatedHparams = [...chosenConfiguration];
        if (param.type === 'int') updatedHparams[index].default = parseInt(value, 10);
        if (param.type === 'float') updatedHparams[index].default = parseFloat(value);
        if (param.type === 'str') updatedHparams[index].default = value.toString();
        if (param.type === 'bool') updatedHparams[index].default = !param.default;
        setChosenConfiguration((updatedHparams));
    };

    useEffect(() => {
        chosenConfiguration && setHyperParams(transformArrayToObject(chosenConfiguration))
    }, [chosenConfiguration])

    const handleIgnoreFirstCheckBox = () => {
        setIgnorePrevious(!ignorePrevious)
    }

    return (
        <>
            <Container maxWidth={'xl'} sx={{my: 5}} data-testid={'codelessForecastModelTraining'}>
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
                            <Grid item xs={12} md={12}>
                                <TextField id="outlined-basic" label="Experiment name" variant="outlined" required
                                           fullWidth
                                           value={experimentName} error={experimentNameError && experimentName === ''}
                                           onChange={e => setExperimentName(e.target.value)}
                                           disabled={executionLoading}/>
                            </Grid>
                            {/*<Grid item xs={6} md={4} display={'flex'} alignItems={'center'}>*/}
                            {/*    /!*<Typography sx={{ml: 'auto'}} variant={'body1'} fontWeight={'bold'}>Ignore Previous*!/*/}
                            {/*    /!*    Runs</Typography>*!/*/}
                            {/*    <Checkbox*/}
                            {/*        checked={ignorePrevious} disabled={executionLoading}*/}
                            {/*        onChange={handleIgnoreFirstCheckBox}*/}
                            {/*        sx={{'& .MuiSvgIcon-root': {fontSize: 28}}}*/}
                            {/*    />*/}
                            {/*</Grid>*/}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container spacing={2} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                    <Grid item xs={12} md={6}>
                        <Stack direction="row" spacing={2} sx={{alignItems: 'center'}}>
                            <ModelTrainingIcon fontSize="large"
                                               sx={{width: '60px', height: '60px', color: '#A1B927', ml: 2, my: 1}}/>
                            <Typography variant={'h5'} color={'inherit'} sx={{width: '100%'}}>
                                Choose an algorithm
                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        {experimentResolution && <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Choose an algorithm</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={model}
                                disabled={executionLoading}
                                label="Choose an algorithm"
                                onChange={e => setModel(e.target.value)}
                            >
                                {models && models.map(modelItem => (
                                    <MenuItem key={modelItem.model_name}
                                              value={modelItem}>{modelItem.model_name}</MenuItem>))}
                            </Select>
                        </FormControl>}
                        {!experimentResolution &&
                            <Alert severity="warning">Choose resolution to see the available algorithms!</Alert>}
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
                        {model &&
                            <Accordion defaultExpanded={true}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon/>}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                    sx={{backgroundColor: '#97A94D'}}
                                >
                                    <Typography>Hyperparameters list</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Grid maxWidth={'xl'} spacing={2} container>
                                        {chosenConfiguration && chosenConfiguration.map((param, index) => (
                                            <Grid item xs={12} md={6} key={index}>
                                                {(param.type === 'int' || param.type === 'float') &&
                                                    <TextField id="outlined-basic"
                                                               type={(param.type === 'int' || param.type === 'float') ? 'number' : 'text'}
                                                               value={param.default}
                                                               InputProps={{
                                                                   inputProps: {
                                                                       min: param.min,
                                                                       max: param.max
                                                                   }
                                                               }}
                                                               onChange={(event) => handleChange(event, index, param)}
                                                               label={param.description + ` ${param.min ? `(Min: ${param.min} - Max: ${param.max})` : ''}`}
                                                               placeholder={`Enter ${param.description} (${param.name})`}
                                                               variant="outlined" fullWidth/>}

                                                {param.type === 'str' &&
                                                    <FormControl fullWidth>
                                                        <InputLabel
                                                            id="demo-simple-select-label">{param.description}</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            value={param.default}
                                                            label={param.description}
                                                            onChange={(event) => handleChange(event, index, param)}
                                                        >
                                                            {param.range.map(option => (
                                                                <MenuItem value={option}>{option}</MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                }

                                                {param.type === 'bool' &&
                                                    <FormGroup>
                                                        <FormControlLabel control={<Checkbox checked={param.default}/>}
                                                                          label={param.description}
                                                                          onChange={(event) => handleChange(event, index, param)}/>
                                                    </FormGroup>
                                                }
                                            </Grid>
                                        ))}
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>}
                    </Grid>
                </Grid>

                {/*<Grid container spacing={2} display={'flex'} justifyContent={'center'} alignItems={'center'}>*/}
                {/*    {model && availableConfigurations && availableConfigurations.map(config => (*/}
                {/*        <Grid item xs={6} md={2} key={config[0]}>*/}
                {/*            <Card elevation={chosenConfiguration === availableConfigurations.indexOf(config) ? 10 : 1}*/}
                {/*                  onClick={() => handleChooseConfiguration(availableConfigurations.indexOf(config))}*/}
                {/*                  sx={{background: chosenConfiguration === availableConfigurations.indexOf(config) ? '#ACBF5D' : ''}}>*/}
                {/*                <CardContent>*/}
                {/*                    <Stack direction={'row'}>*/}
                {/*                        <Typography variant={'h6'} gutterBottom>*/}
                {/*                            {config[0]}*/}
                {/*                        </Typography>*/}
                {/*                        {chosenConfiguration === availableConfigurations.indexOf(config) &&*/}
                {/*                            <CheckCircleIcon color={'success'} sx={{ml: 'auto'}}/>}*/}
                {/*                    </Stack>*/}
                {/*                    <hr style={{borderBottom: 0}}/>*/}

                {/*                    {Object.entries(config[1]).map(([parameterName, parameterValue]) => {*/}
                {/*                        return (<Typography variant={'subtitle2'}>*/}
                {/*                            <span style={{fontWeight: 'bold'}}>{parameterName}</span>: {parameterValue}*/}
                {/*                        </Typography>);*/}
                {/*                    })}*/}
                {/*                </CardContent>*/}
                {/*            </Card>*/}
                {/*        </Grid>))}*/}
                {/*    {model && availableConfigurations.length === 0 && <Container maxWidth={'lg'} sx={{my: 4}}>*/}
                {/*        <Alert severity="error">No available configurations for this model!</Alert>*/}
                {/*    </Container>}*/}
                {/*</Grid>*/}
            </Container>
        </>
    );
}

export default ModelTrainingSetup;