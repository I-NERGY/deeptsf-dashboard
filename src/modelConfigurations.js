export const modelConfigurations = {
    "test": {
        "model": "LSTM",
        "n_rnn_layers": 1,
        "hidden_dim": 2,
        "n_epochs": 1,
        "input_chunk_length": 96,
        "training_length": 96,
        "random_state": 0,
        "nr_epochs_val_period": 1,
        "dropout": 0,
        "learning_rate": 0.009,
        "batch_size": 2048
    },
    "test2": {
        "model": "LSTM",
        "n_rnn_layers": 1,
        "input_chunk_length": 96,
        "output_chunk_length": 96,
        "hidden_size": 1,
        "n_epochs": 2,
        "random_state": 0,
        "nr_epochs_val_period": 2,
        "dropout": 0,
        "learning_rate": 0.01,
        "batch_size": 2048
    },
    "lstm_example": {
        "model": "LSTM",
        "n_rnn_layers": 2,
        "hidden_dim": 64,
        "n_epochs": 100,
        "input_chunk_length": 672,
        "training_length": 672,
        "random_state": 0,
        "nr_epochs_val_period": 2,
        "dropout": 0,
        "learning_rate": 0.001,
        "batch_size": 1024
    },
    "lstm1_7": {
        "model": "LSTM",
        "n_rnn_layers": 2,
        "hidden_dim": 64,
        "n_epochs": 100,
        "input_chunk_length": 672,
        "training_length": 672,
        "random_state": 0,
        "nr_epochs_val_period": 2,
        "dropout": 0,
        "learning_rate": 0.001,
        "batch_size": 1024
    },
    "blocklstm0_4": {
        "model": "LSTM",
        "n_rnn_layers": 1,
        "input_chunk_length": 384,
        "output_chunk_length": 96,
        "hidden_size": 20,
        "n_epochs": 300,
        "random_state": 0,
        "nr_epochs_val_period": 2,
        "dropout": 0,
        "learning_rate": 0.0008,
        "batch_size": 1024
    },
    "blocklstm0_7": {
        "model": "LSTM",
        "n_rnn_layers": 1,
        "input_chunk_length": 672,
        "output_chunk_length": 96,
        "hidden_size": 20,
        "n_epochs": 300,
        "random_state": 0,
        "nr_epochs_val_period": 2,
        "dropout": 0,
        "learning_rate": 0.0009,
        "batch_size": 1024
    },
    "blocklstm0_10": {
        "model": "LSTM",
        "n_rnn_layers": 1,
        "input_chunk_length": 960,
        "output_chunk_length": 96,
        "hidden_size": 20,
        "n_epochs": 300,
        "random_state": 0,
        "nr_epochs_val_period": 2,
        "dropout": 0,
        "learning_rate": 0.0009,
        "batch_size": 1024
    },
    "blocklstm1_4": {
        "model": "LSTM",
        "n_rnn_layers": 2,
        "input_chunk_length": 384,
        "output_chunk_length": 96,
        "hidden_size": 64,
        "n_epochs": 300,
        "random_state": 0,
        "nr_epochs_val_period": 2,
        "dropout": 0,
        "learning_rate": 0.001,
        "batch_size": 1024
    },
    "blocklstm1_7": {
        "model": "LSTM",
        "n_rnn_layers": 2,
        "input_chunk_length": 672,
        "output_chunk_length": 96,
        "hidden_size": 64,
        "n_epochs": 300,
        "random_state": 0,
        "nr_epochs_val_period": 2,
        "dropout": 0,
        "learning_rate": 0.001,
        "batch_size": 1024
    },
    "blocklstm1_10": {
        "model": "LSTM",
        "n_rnn_layers": 2,
        "input_chunk_length": 960,
        "output_chunk_length": 96,
        "hidden_size": 64,
        "n_epochs": 300,
        "random_state": 0,
        "nr_epochs_val_period": 2,
        "dropout": 0,
        "learning_rate": 0.001,
        "batch_size": 1024
    },
    "nbeats0_4": {
        "input_chunk_length": 384,
        "output_chunk_length": 96,
        "num_stacks": 20,
        "num_blocks": 1,
        "num_layers": 4,
        "generic_architecture": true,
        "layer_widths": 64,
        "expansion_coefficient_dim": 5,
        "n_epochs": 300,
        "random_state": 0,
        "nr_epochs_val_period": 2,
        "batch_size": 1024
    },
    "nbeats0_7": {
        "input_chunk_length": 672,
        "output_chunk_length": 96,
        "num_stacks": 20,
        "num_blocks": 1,
        "num_layers": 4,
        "generic_architecture": true,
        "layer_widths": 64,
        "expansion_coefficient_dim": 5,
        "n_epochs": 300,
        "random_state": 0,
        "nr_epochs_val_period": 2,
        "batch_size": 1024
    },
    "nbeats0_10": {
        "input_chunk_length": 960,
        "output_chunk_length": 96,
        "num_stacks": 20,
        "num_blocks": 1,
        "num_layers": 4,
        "generic_architecture": true,
        "layer_widths": 64,
        "expansion_coefficient_dim": 5,
        "n_epochs": 300,
        "random_state": 0,
        "nr_epochs_val_period": 2,
        "batch_size": 1024
    },
    "nbeats1_4": {
        "input_chunk_length": 384,
        "output_chunk_length": 96,
        "num_stacks": 25,
        "num_blocks": 1,
        "num_layers": 4,
        "generic_architecture": true,
        "layer_widths": 128,
        "expansion_coefficient_dim": 5,
        "n_epochs": 300,
        "random_state": 0,
        "nr_epochs_val_period": 2,
        "batch_size": 1024
    },
    "nbeats1_7": {
        "input_chunk_length": 672,
        "output_chunk_length": 96,
        "num_stacks": 25,
        "num_blocks": 1,
        "num_layers": 4,
        "generic_architecture": true,
        "layer_widths": 128,
        "expansion_coefficient_dim": 5,
        "n_epochs": 300,
        "random_state": 0,
        "nr_epochs_val_period": 2,
        "batch_size": 1024
    },
    "nbeats1_10": {
        "input_chunk_length": 960,
        "output_chunk_length": 96,
        "num_stacks": 25,
        "num_blocks": 1,
        "num_layers": 4,
        "generic_architecture": true,
        "layer_widths": 128,
        "expansion_coefficient_dim": 5,
        "n_epochs": 300,
        "random_state": 0,
        "nr_epochs_val_period": 2,
        "batch_size": 1024
    },
    "nbeats2_4": {
        "input_chunk_length": 384,
        "output_chunk_length": 96,
        "num_stacks": 30,
        "num_blocks": 1,
        "num_layers": 4,
        "generic_architecture": true,
        "layer_widths": 512,
        "expansion_coefficient_dim": 5,
        "n_epochs": 300,
        "random_state": 0,
        "nr_epochs_val_period": 2,
        "batch_size": 1024
    },
    "nbeats2_7": {
        "input_chunk_length": 672,
        "output_chunk_length": 96,
        "num_stacks": 30,
        "num_blocks": 1,
        "num_layers": 4,
        "generic_architecture": true,
        "layer_widths": 512,
        "expansion_coefficient_dim": 5,
        "n_epochs": 300,
        "random_state": 0,
        "nr_epochs_val_period": 2,
        "batch_size": 1024
    },
    "nbeats2_10": {
        "input_chunk_length": 960,
        "output_chunk_length": 96,
        "num_stacks": 30,
        "num_blocks": 1,
        "num_layers": 4,
        "generic_architecture": true,
        "layer_widths": 512,
        "expansion_coefficient_dim": 5,
        "n_epochs": 300,
        "random_state": 0,
        "nr_epochs_val_period": 2,
        "batch_size": 1024
    },
    "testtcn": {
        "input_chunk_length": 384,
        "output_chunk_length": 96,
        "kernel_size": 3,
        "num_filters": 3,
        "dilation_base": 2,
        "weight_norm": true,
        "dropout": 0,
        "n_epochs": 1,
        "random_state": 0,
        "nr_epochs_val_period": 1,
        "batch_size": 1024
    },
    "testnbeats": {
        "input_chunk_length": 672,
        "output_chunk_length": 96,
        "num_stacks": 25,
        "num_blocks": 1,
        "num_layers": 4,
        "generic_architecture": true,
        "layer_widths": 128,
        "expansion_coefficient_dim": 5,
        "n_epochs": 2,
        "random_state": 0,
        "nr_epochs_val_period": 2,
        "batch_size": 2048
    },
    "tcn0_4": {
        "input_chunk_length": 384,
        "output_chunk_length": 96,
        "kernel_size": 3,
        "num_filters": 3,
        "dilation_base": 2,
        "weight_norm": true,
        "dropout": 0,
        "n_epochs": 300,
        "random_state": 0,
        "nr_epochs_val_period": 2,
        "batch_size": 1024
    },
    "tcn0_7": {
        "input_chunk_length": 672,
        "output_chunk_length": 96,
        "kernel_size": 3,
        "num_filters": 3,
        "dilation_base": 2,
        "weight_norm": true,
        "dropout": 0,
        "n_epochs": 300,
        "random_state": 0,
        "nr_epochs_val_period": 2,
        "batch_size": 1024
    },
    "tcn0_10": {
        "input_chunk_length": 960,
        "output_chunk_length": 96,
        "kernel_size": 3,
        "num_filters": 3,
        "dilation_base": 2,
        "weight_norm": true,
        "dropout": 0,
        "n_epochs": 300,
        "random_state": 0,
        "nr_epochs_val_period": 2,
        "batch_size": 1024
    },
    "tcn1_4": {
        "input_chunk_length": 384,
        "output_chunk_length": 96,
        "kernel_size": 5,
        "num_filters": 5,
        "dilation_base": 3,
        "weight_norm": true,
        "dropout": 0,
        "n_epochs": 300,
        "random_state": 0,
        "nr_epochs_val_period": 2,
        "batch_size": 1024
    },
    "tcn1_7": {
        "input_chunk_length": 672,
        "output_chunk_length": 96,
        "kernel_size": 5,
        "num_filters": 5,
        "dilation_base": 3,
        "weight_norm": true,
        "dropout": 0,
        "n_epochs": 300,
        "random_state": 0,
        "nr_epochs_val_period": 2,
        "batch_size": 1024
    },
    "tcn1_10": {
        "input_chunk_length": 960,
        "output_chunk_length": 96,
        "kernel_size": 5,
        "num_filters": 5,
        "dilation_base": 3,
        "weight_norm": true,
        "dropout": 0,
        "n_epochs": 300,
        "random_state": 0,
        "nr_epochs_val_period": 2,
        "batch_size": 1024
    },
    "tcn3_4": {
        "input_chunk_length": 384,
        "output_chunk_length": 96,
        "kernel_size": 13,
        "num_filters": 9,
        "dilation_base": 9,
        "weight_norm": true,
        "dropout": 0,
        "n_epochs": 300,
        "random_state": 0,
        "nr_epochs_val_period": 2,
        "batch_size": 1024
    },
    "tcn3_7": {
        "input_chunk_length": 672,
        "output_chunk_length": 96,
        "kernel_size": 13,
        "num_filters": 9,
        "dilation_base": 9,
        "weight_norm": true,
        "dropout": 0,
        "n_epochs": 300,
        "random_state": 0,
        "nr_epochs_val_period": 2,
        "batch_size": 1024
    },
    "tcn3_10": {
        "input_chunk_length": 960,
        "output_chunk_length": 96,
        "kernel_size": 13,
        "num_filters": 9,
        "dilation_base": 9,
        "weight_norm": true,
        "dropout": 0,
        "n_epochs": 300,
        "random_state": 0,
        "nr_epochs_val_period": 2,
        "batch_size": 1024
    },
    "lgbm_4_d_w": {
        "lags": [
            -1,
            -2,
            -3,
            -4,
            -96,
            -672
        ],
        "lags_past_covariates": null,
        "lags_future_covariates": [
            1,
            1
        ],
        "future_covs_as_tuple": true,
        "random_state": 0
    },
    "lgbm_4d": {
        "lags": 384,
        "lags_past_covariates": null,
        "lags_future_covariates": [
            1,
            1
        ],
        "future_covs_as_tuple": true,
        "random_state": 0
    },
    "lgbm_7d_none": {
        "lags": 672,
        "lags_past_covariates": null,
        "lags_future_covariates": [
            1,
            1
        ],
        "future_covs_as_tuple": true,
        "random_state": 0
    },
    "lgbm_7d": {
        "lags": 672,
        "lags_past_covariates": null,
        "lags_future_covariates": "None",
        "future_covs_as_tuple": false,
        "random_state": 0
    },
    "lgbm_3d": {
        "lags": 288,
        "lags_past_covariates": null,
        "lags_future_covariates": [
            1,
            1
        ],
        "future_covs_as_tuple": true,
        "random_state": 0
    },
    "lgbm_w": {
        "lags": 672,
        "lags_past_covariates": null,
        "lags_future_covariates": [
            1,
            1
        ],
        "future_covs_as_tuple": true,
        "random_state": 0
    },
    "lgbm_d": {
        "lags": 96,
        "lags_past_covariates": null,
        "lags_future_covariates": [
            1,
            1
        ],
        "future_covs_as_tuple": true,
        "random_state": 0
    },
    "rf_4_d_w": {
        "lags": [
            -1,
            -2,
            -3,
            -4,
            -96,
            -672
        ],
        "lags_past_covariates": null,
        "lags_future_covariates": [
            1,
            1
        ],
        "future_covs_as_tuple": true,
        "random_state": 0
    },
    "rf_w": {
        "lags": 672,
        "lags_past_covariates": null,
        "lags_future_covariates": [
            1,
            1
        ],
        "future_covs_as_tuple": true,
        "random_state": 0
    },
    "rf_4d": {
        "lags": 384,
        "lags_past_covariates": null,
        "lags_future_covariates": [
            1,
            1
        ],
        "future_covs_as_tuple": true,
        "random_state": 0
    },
    "rf_3d": {
        "lags": 288,
        "lags_past_covariates": null,
        "lags_future_covariates": [
            1,
            1
        ],
        "future_covs_as_tuple": true,
        "random_state": 0
    },
    "rf_d": {
        "lags": 96,
        "lags_past_covariates": null,
        "lags_future_covariates": [
            1,
            1
        ],
        "future_covs_as_tuple": true,
        "random_state": 0
    }
}