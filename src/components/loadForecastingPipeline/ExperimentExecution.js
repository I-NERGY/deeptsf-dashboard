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

const ExperimentExecution = ({
                                 handleExecute,
                                 executionLoading,
                                 uploadSuccess,
                                 experimentResolution,
                                 dateVal,
                                 dateTest,
                                 dateEnd,
                                 experimentName,
                                 model,
                                 chosenConfiguration,
                                 forecastHorizon,
                                 executionInitiated
                             }) => {
    return (
        <>
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
        </>
    );
}

export default ExperimentExecution;