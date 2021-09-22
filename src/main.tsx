import './assets/index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './ui/App';
import { StoreProvider } from './ui/Store';
import { Demo } from './demo/Demo';

const isDemo = localStorage.getItem('demo') === 'true';

ReactDOM.render(
    isDemo ? (
        <Demo />
    ) : (
        <React.StrictMode>
            <StoreProvider>
                <App />
            </StoreProvider>
        </React.StrictMode>
    ),
    document.getElementById('root')
);
