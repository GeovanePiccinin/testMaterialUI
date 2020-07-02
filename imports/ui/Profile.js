import React, { Component } from 'react';
import { withHistory, Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { Paper, withStyles, ButtonBase, Grid, TextField, Input, Button, MenuItem, FormControlLabel, Checkbox, Select} from '@material-ui/core';
import { Face, Fingerprint } from '@material-ui/icons';
import {withTracker} from "meteor/react-meteor-data";
import {Meteor} from "meteor/meteor";

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
})

const Profile = withStyles(styles)(
class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            email :'',
            company : '',
            sex : '',
            dateOfBirth: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderForm = this.renderForm.bind(this);
    }

    componentWillMount() {
        this.setState(
            {
                username: Meteor.users.username,
                email: Meteor.users.email,
                company: Meteor.users.company,
                sex: Meteor.users.sex,
                dateOfBirth: Meteor.users.dateOfBirth,
                picture: ''

            })
    }

    componentWillReceiveProps(nextProps) {
        this.setState(
            {
                username: nextProps.currentUser.username,
                email: nextProps.currentUser.emails[0].address,

                company: nextProps.currentUser.company,
                sex: nextProps.currentUser.sex,
                dateOfBirth: nextProps.currentUser.dateOfBirth,
            })

    }



    renderForm () {
        const { classes } = this.props;
        let imagemUrl = '';

            if(this.props.currentUser.bin){
                //imagemUrl =  'data:image/'+this.props.currentUser.ext+';base64,'+ this.props.currentUser.bin;
                imagemUrl =  this.props.currentUser.bin;
            }

        const profileImage = (this.props.currentUser.bin) ?
            <img src= {imagemUrl}/> :
            <div>Sem imagem</div>;


            if(this.props.currentUser){
            return(<Paper className={classes.root}>
                <div >
                    <Grid container spacing={8} alignItems="flex-end">
                        <Grid item>
                            <Face />
                        </Grid>
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField
                                id="username"
                                label="Name"
                                type="text"

                                required
                                fullWidth
                                value = {this.state.username}
                                onChange={(e) => this.setState({ username: e.target.value })}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} alignItems="flex-end">
                        <Grid item>
                            <Face />
                        </Grid>
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField
                                id="email"
                                label="Email"
                                type="email"

                                required
                                fullWidth
                                value = {this.state.email}
                                onChange={(e) => this.setState({ email: e.target.value })}
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={8} alignItems="flex-end">

                        <Grid item md={true} sm={true} xs={true}>
                            <TextField
                                id="company"
                                label="Company"
                                type="text"

                                fullWidth
                                value = {this.state.company}
                                onChange={(e) => this.setState({ company : e.target.value })}
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={8} alignItems="flex-end">
                        <Grid item>

                            <TextField
                                id="date"
                                label="Birthday"
                                type="date"
                                defaultValue="2017-05-24"
                                value = {this.state.dateOfBirth}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={(e) => this.setState({ dateOfBirth : e.target.value })}
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={8} alignItems="flex-end">
                        <Grid item>
                            <Face />
                        </Grid>
                        <Grid item md={true} sm={true} xs={true}>

                            <Select
                                label="Sex"
                                value={this.state.sex}
                                onChange={(e) => this.setState({ sex: e.target.value })}
                                input={<Input name="sex" id="sex-label-placeholder" />}
                                displayEmpty
                                name="sex"

                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value="M">Male</MenuItem>
                                <MenuItem value="F">Female</MenuItem>

                            </Select>




                        </Grid>
                    </Grid>

                    <Grid container justify="center" style={{ marginTop: '10px' }}>
                        <Button onClick={this.handleSubmit} variant="outlined" color="primary" style={{ textTransform: "none" }}>Save</Button>
                    </Grid>

                    <Grid container spacing={8} alignItems="flex-end">
                        <Grid item>
                            {profileImage}
                        </Grid>
                    </Grid>

                    <Grid container spacing={8} alignItems="flex-end">
                        <Grid item>
                            <input
                                accept="image/*"
                                className={classes.input}
                                style={{ display: 'none' }}
                                id="raised-button-file"
                                multiple
                                type="file"
                                onChange= {this.imageUpload.bind(this)}
                            />
                            <label htmlFor="raised-button-file">
                                <Button variant="raised" component="span" className={classes.button}>
                                    New profile picture
                                </Button>
                            </label>
                        </Grid>
                    </Grid>



                </div>
            </Paper>);
        }

    }

    imageUpload(event){



        let file = event.target.files[0];

        let mark = (file.name).lastIndexOf('.') + 1;
        let ext  = (file.name).slice( mark );
        ext      = ( ext == ( 'jpg' || 'jpeg' ) ) ? 'jpeg' : 'png';

        var ibin = null;

        let fr = new FileReader();

        fr.onload = function() {

            ibin = this.result;

            console.log('ibin on file reader');
            console.log(ibin);

            Meteor.call( 'users.profileImageUpload', Meteor.userId(), { ext: ext, bin: ibin });

        };



        Meteor.setTimeout( function() {
            //clean-up stuff
        }, 1000);

        //console.log('ibin que sera enviado');
        //console.log(ibin);

        //fr.readAsBinaryString(file);
        fr.readAsDataURL( file );

    }


    handleSubmit(e){

        const editedUser = {
            username : this.state.username,
            email : this.state.email,
            company : this.state.company,
            sex : this.state.sex,
            dateOfBirth : this.state.dateOfBirth,
        }

        console.log('salvando o profile');
        console.log(editedUser);


    Meteor.call('users.userUpdate', this.props.currentUser, editedUser);

        this.state.username = '';
        this.state.email = '';
        this.state.company = '';
        this.state.sex = '';
        this.state.dateOfBirth = '';

        this.props.history.push('/todolist');
    }

    render() {

        if(this.props.currentUser){
            return  this.renderForm()
        }
        return <div></div>

    }
});
//self invoking function
export default withTracker((props) => {
    //Meteor.subscribe('Meteor.users.company', Meteor.userId());
    //Meteor.subscribe('Meteor.users.sex', Meteor.userId());


    let s = Meteor.subscribe('allUserData', function() {
        console.log('userdata available');
        //console.log('s.ready: '+s.ready());
        console.log('userData: ' + JSON.stringify( Meteor.users.findOne()) );
    });


    console.log('s.ready: '+s.ready())

    //const currentUser = Meteor.users.find(Meteor.userId()).fetch();

    console.log(Meteor.userId());


    //const currentUser = Meteor.user().company;
    const currentUser = Meteor.users.findOne();

    console.log(currentUser);


    return ({
        currentUser
    });
})(Profile);