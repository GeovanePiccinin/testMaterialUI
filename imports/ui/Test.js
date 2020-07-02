import Button from '@material-ui/core/Button';
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'

export default class Test extends Component {
    constructor(props){
        super(props);
        this.goTwo = this.goTwo.bind(this);
    }
    goTwo(e){
        e.preventDefault();
        this.props.history.push('/2');
    }

    render() {
        return (
            <div>
                <a href="#" onClick={this.goTwo}>Go two!</a>
            </div>
        );
    }
}





