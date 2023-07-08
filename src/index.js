import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import awsconfig from './aws-exports';
import { Amplify, Auth } from 'aws-amplify';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@aws-amplify/ui-react/styles.css';

Amplify.configure(awsconfig);

// Amplify.configure({
//   Auth: {
//     identityPoolId: 'us-east-1:567d80d0-a1ea-4eda-97ca-54a4c4aa8863', //REQUIRED - Amazon Cognito Identity Pool ID
//     region: 'us-east-1', // REQUIRED - Amazon Cognito Region
//     userPoolId: 'us-east-1_QSTCc2rBy', //OPTIONAL - Amazon Cognito User Pool ID
//     userPoolWebClientId: '5s56sb5l4f18e4q8t53q80vvdh', //OPTIONAL - Amazon Cognito Web Client ID
//   },
//   Storage: {
//     AWSS3: {
//       bucket: 'tutorial-project-iut', //REQUIRED -  Amazon S3 bucket name
//       region: 'us-east-1', //OPTIONAL -  Amazon service region
//     }
//   }
// });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
