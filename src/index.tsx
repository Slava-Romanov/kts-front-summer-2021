import React from 'react';

import ReactDOM from 'react-dom';

import './index.css';
import './layouts/Layout';
import Layout from './layouts/Layout';
import './root/root';

ReactDOM.render(
    <React.StrictMode>
        <Layout />
    </React.StrictMode>,
    document.getElementById('root')
);
