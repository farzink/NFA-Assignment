import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { store } from './data';
import { Provider } from 'react-redux'
import { HashRouter } from "react-router-dom";

import RouterConfig from './router-config';

const root = <Provider store={store}>
    <HashRouter>
        <RouterConfig />
    </HashRouter>
</Provider>

ReactDOM.render(root, document.getElementById('root'));

serviceWorker.unregister();
