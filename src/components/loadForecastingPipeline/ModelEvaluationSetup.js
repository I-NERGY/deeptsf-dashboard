import React from 'react';
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import LineAxisOutlinedIcon from "@mui/icons-material/LineAxisOutlined";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";

const ModelEvaluationSetup = ({
                                  forecastHorizon,
                                  executionLoading,
                                  setForecastHorizon
                              }) => {
    return (
        <>
            <Container maxWidth={'xl'} sx={{my: 5}} data-testid={'codelessForecastModelEvaluationConfiguration'}>
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
        </>
    );
}

export default ModelEvaluationSetup;