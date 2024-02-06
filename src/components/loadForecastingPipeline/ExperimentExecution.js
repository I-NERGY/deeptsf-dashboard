import React from 'react';
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import TerminalIcon from "@mui/icons-material/Terminal";
import Button from "@mui/material/Button";
import ChevronRight from "@mui/icons-material/ChevronRight";
import CircularProgress from "@mui/material/CircularProgress";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import Container from "@mui/material/Container";
import axios from "axios";

const ExperimentExecution = ({
                                 executionLoading,
                                 uploadSuccess,
                                 experimentResolution,
                                 dateVal,
                                 dateTest,
                                 dateEnd,
                                 experimentName,
                                 model,
                                 chosenConfiguration,
                                 hyperParams,
                                 removeOutliers,
                                 forecastHorizon,
                                 executionInitiated,
                                 setExecutionLoading,
                                 setExecutionInitiated,
                                 setExecutionSuccess,
                                 setExecutionFailure,
                                 availableConfigurations,
                                 aggregationMethod,
                                 ignorePrevious,
                                 seriesUri,
                                 multiSeriesFile,
                                 ucChosen,
                                 tsUsedID,
                                 evaluatedAllTs,
                                 setEvaluatedAllTs
                             }) => {
    const authenticationEnabled = process.env.REACT_APP_AUTH === "True"

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
            // hyperparams_entrypoint: availableConfigurations[chosenConfiguration][0],
            hyperparams_entrypoint: hyperParams,
            rmv_outliers: removeOutliers,
            resampling_agg_method: aggregationMethod,
            ignore_previous_runs: ignorePrevious,
            multiple: multiSeriesFile,
            ts_used_id: tsUsedID,
            evaluate_all_ts: evaluatedAllTs,
            // uc: null
        }

        if (ucChosen === 'uc2') {
            payload.ts_used_id = null
            payload.evaluate_all_ts = false
            payload.uc = 2
        }

        if (ucChosen === 'uc6') {
            payload.ts_used_id = tsUsedID
            payload.evaluate_all_ts = false
            payload.uc = 6
        }

        console.log(payload)

        axios.post('/experimentation_pipeline/run_all', payload)
            .then(response => {
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

    return (
        <>
            <Container maxWidth={'xl'} sx={{my: 5}} data-testid={'codelessForecastExperimentExecution'}>
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
                                disabled={(executionLoading || !uploadSuccess || !experimentResolution || !dateVal || !dateTest || !dateEnd || !experimentName || !model || chosenConfiguration === '' || !forecastHorizon) && !ucChosen}
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
                                    onClick={() => window.open(process.env.REACT_APP_MLFLOW, '_blank')}
                            >
                                <Typography variant={'h6'}>Visit MLFlow Server</Typography>
                            </Button>
                        </Grid>
                    </Grid>}
            </Container>
        </>
    );
}

export default ExperimentExecution;