import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';

const theme = createMuiTheme({
    palette: {
        primary: orange
    }
});

//import { renderRoutes } from '../imports/startup/routes.js';

//import App from '../imports/ui/App';

import { renderRoutes } from '../imports/startup/authRoutes.js';

import './main.html';

Meteor.startup(() => {
    render(
        <MuiThemeProvider theme={theme}>
            {renderRoutes()}
        </MuiThemeProvider>,
        document.getElementById('target'));
    //render(<App />, document.getElementById('target'));
});
