import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';


import Test from '../ui/Test';
import Test2 from '../ui/Test2';

export const renderRoutes = () => (
    <Router>
        <switch>
            <Route path="/" exact={true} component={Test}/>
            <Route path="/2" component={Test2}/>

        </switch>
    </Router>
);
