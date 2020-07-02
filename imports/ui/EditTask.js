import {Button, Checkbox, FormControlLabel, Grid, Paper, TextField, Typography, withStyles} from "@material-ui/core";
import React, {Component} from "react";
import {withTracker} from "meteor/react-meteor-data";
import {Meteor} from "meteor/meteor";
import {Tasks} from "../api/tasks";

const flex = {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-evenly'
}

const styles = ({spacing: {unit}}) => ({
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

const EditTask = withStyles(styles)(
    class EditTaskPage extends Component {

        constructor(props) {
            super(props);
            this.state = {
                title: '',
                desc: '',
                date: {},
                owner: ''
            }
        }
        handleSubmit(event) {

            event.preventDefault();


            const newTask = {
                _id: this.props.task['0']._id,
                title: this.state.title,
                desc: this.state.desc,
                owner: this.props.task['0'].owner,
            }


            console.log('vai chamar Meteor.editTask');
            console.log(newTask);

            Meteor.call('tasks.editTask', newTask);
            this.state.title = '';
            this.state.desc = '';

            this.props.history.push('/todolist');

        }

        render() {

            const task = this.props.task && this.props.task['0'] ? this.props.task['0'] : {};

            console.log(task.username);

            const {classes} = this.props;

            return (

                <Paper className={classes.root}>
                    <div className={classes.margin}>
                        <Grid container alignItems="center" justify="space-between">
                            <Grid item>
                                <Typography variant="body1" gutterBottom>
                                    Date: {task.createdAt.toDateString()}
                                </Typography>
                            </Grid>

                        </Grid>
                        <Grid container alignItems="center" justify="space-between">
                            <Grid item>
                                <Typography variant="body1" gutterBottom>
                                    {task.username.toString()}
                                </Typography>
                            </Grid>

                        </Grid>

                        <form onSubmit={this.handleSubmit.bind(this)}>
                            <Grid container spacing={8} alignItems="flex-end">
                                <Grid item>
                                    <TextField
                                        name='title'
                                        label='Task'
                                        margin='normal'
                                        defaultValue={task.title}

                                        onChange={(e) => this.setState({title: e.target.value})}
                                    />
                                </Grid>

                            </Grid>
                            <Grid container spacing={8} alignItems="flex-end">
                                <Grid item>
                                    <TextField
                                        name='desc'
                                        label='Description'
                                        margin='normal'
                                        defaultValue={task.desc}
                                        onChange={(e) => this.setState({desc: e.target.value})}
                                    />
                                </Grid>

                            </Grid>

                            <Grid container spacing={8} alignItems="flex-end">
                                <Grid item>
                                    <Button
                                        type='submit'
                                        color='primary'
                                        variant='raised'
                                    >
                                        Save
                                    </Button>
                                </Grid>

                            </Grid>
                        </form>
                    </div>
                </Paper>


            );
        }
    });

export default withTracker((props) => {
    Meteor.subscribe('tasks');
    let taskId = props.match.params.taskId;
    let task = Tasks.find({_id: taskId}).fetch();
    return {
        task,
    };
})(EditTask);