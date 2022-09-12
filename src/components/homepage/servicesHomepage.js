import AnalyticsIcon from '@mui/icons-material/Analytics';
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';
import RuleIcon from '@mui/icons-material/Rule';
import TerminalIcon from '@mui/icons-material/Terminal';

export const servicesHomepage = [
    {
        'id': 'model_training',
        'title': 'Model Training',
        'description': 'Train your Machine Learning models via a user intuitive UI.',
        'icon': <ModelTrainingIcon style={{color: 'white', fontSize: '80px'}}/>,
        'image': 'https://images.unsplash.com/photo-1639004643331-9526630beb3d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1141&q=80',
        'link': '/load-forecast'
    },
    {
        'id': 'model_evaluation',
        'title': 'Model Evaluation',
        'description': 'Evaluate your Machine Learning models and visualise Actual vs Forecasted values.',
        'icon': <RuleIcon style={{color: 'white', fontSize: '80px'}}/>,
        'image': 'https://freerangestock.com/sample/117860/artificial-intelligence--machine-learning--digital-brain-mesh-.jpg',
        'link': '/metrics'
    },
    {
        'id': 'model_deployment',
        'title': 'Model Deployment',
        'description': 'Deploy your best Machine Learning models.',
        'icon': <TerminalIcon style={{color: 'white', fontSize: '80px'}}/>,
        'image': 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        'link': ''
    },
]