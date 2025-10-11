import React from 'react';
import ReactDOM from 'react-dom/client';
import { DemoApp } from './demo';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <DemoApp />
    </React.StrictMode>
);
