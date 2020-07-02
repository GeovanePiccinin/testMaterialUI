import Button from '@material-ui/core/Button';
import React, { Component } from 'react';
import { Link } from 'react-router-dom'

export default class Test2 extends Component {

    render() {
        return (
            <div>
                <Button component={Link} to="/">
                    Link test 2
                </Button>
            </div>
        );
    }
}





