import React, { Component } from 'react';
import {
    Paper,
    Typography,
    TextField,
    Button,
    ListItemSecondaryAction,
    IconButton, Grid
} from '@material-ui/core';

import { List, ListItem, ListItemText } from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';
import {withTracker} from "meteor/react-meteor-data";
import {Meteor} from "meteor/meteor";

import { Tasks } from '../api/tasks.js';
import Task from './Task';

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


const TodoList = withStyles(styles)(
class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            desc: ''

        }
    }


    handleSubmit(event) {

        event.preventDefault();

        const newTask = {
            title : this.state.title,
            desc : this.state.desc,
        }

        if(newTask.title == '' || newTask.desc == '') return;
        else{
            Meteor.call('tasks.insert', newTask);
            this.state.title = '';
            this.state.desc = '';

       }

    }

    renderTasks() {
        let filteredTasks = this.props.tasks;

        return filteredTasks.map((task) => {

            return (
                <Task
                    key={task._id}
                    task = {task}
                />
            );
        });
    }

    render() {
      const { classes } = this.props;
        return (
            <Paper className={classes.root}>
            <Typography variant='display1' align='center' gutterBottom>
                Todo List
            </Typography>


            <form onSubmit={this.handleSubmit.bind(this)}>
                <Grid container spacing={8} alignItems="flex-end">
                    <Grid item>
                        <TextField
                            name='title'
                            label='Task'
                            margin='normal'
                            value = {this.state.title}
                            onChange={(e) => this.setState({ title: e.target.value })}
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={8} alignItems="flex-end">
                    <Grid item>
                        <TextField
                            name='desc'
                            label='Description'
                            margin='normal'
                            value = {this.state.desc}
                            onChange={(e) => this.setState({ desc: e.target.value })}
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
                    Create
                </Button>
                    </Grid>
                </Grid>
            </form>
                <List>
                    {this.renderTasks()}
                </List>
            </Paper>
        )
    }
});

export default withTracker(() => {
    Meteor.subscribe('tasks');
    return {
        tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
        incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
        currentUser: Meteor.user(),
    };
})(TodoList);