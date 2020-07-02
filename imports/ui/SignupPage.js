import React, { Component } from 'react';
import { withHistory, Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { Paper, withStyles, Grid, TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core';
import { Face, Fingerprint } from '@material-ui/icons'



const flex = {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-evenly'
}

const styles = ({ spacing: { unit } }) => ({
    root: {
        margin: `${unit * 3}px auto`,
        padding: unit * 2,
        maxWidth: 400
    },
    header: {
        ...flex,
        marginTop: unit * 2
    },
    form: {
        ...flex,
        marginBottom: unit
    }
});


class SignupPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            error: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
        let name = document.getElementById("signup-name").value;
        let email = document.getElementById("signup-email").value;
        let password = document.getElementById("signup-password").value;
        this.setState({error: "test"});
        Accounts.createUser({
            email: email,
            username: name,
            password: password,
            company: '',
            sex: '',
            dateOfBirth: ''
        }, (err) => {
            if(err){
                this.setState({
                    error: err.reason
                });
            } else {
                this.props.history.push('/login');
            }
        });
    }

    render(){

        const { classes } = this.props;
        return (

            <Paper className={classes.root} >
                <div className={classes.margin}>
                    <Grid container spacing={8} alignItems="flex-end">
                        <Grid item>
                            <Face />
                        </Grid>
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField id="signup-name" label="User" type="text" fullWidth autoFocus required />
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} alignItems="flex-end">
                        <Grid item>
                            <Face />
                        </Grid>
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField id="signup-email" label="Email" type="email" fullWidth autoFocus required />
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} alignItems="flex-end">
                        <Grid item>
                            <Fingerprint />
                        </Grid>
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField id="signup-password" label="Password" type="password" fullWidth required />
                        </Grid>
                    </Grid>

                    <Grid container justify="center" style={{ marginTop: '10px' }}>
                        <Button onClick={this.handleSubmit} variant="outlined" color="primary" style={{ textTransform: "none" }}>Register</Button>
                    </Grid>
                </div>
            </Paper>
        );
    }
}

export default withStyles(styles)(SignupPage);