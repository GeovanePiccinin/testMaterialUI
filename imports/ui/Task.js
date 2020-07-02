import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import {Button, IconButton, ListItem, ListItemSecondaryAction, ListItemText, TextField, ListItemIcon} from "@material-ui/core";
import {Cancel, Delete, Edit, Inbox} from "@material-ui/icons";
import {Tasks} from "../api/tasks";
import {Redirect, Link} from "react-router-dom";


// Task component - represents a single todo item

export default class Task extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            desc: '',
            edit_mode : false

        }
    }

    deleteThisTask() {
        Meteor.call('tasks.remove', this.props.task._id);
    }
    render() {
        const taskId = this.props.task._id;
            return (
            <ListItem key={taskId}>
                <ListItemIcon>
                    <Inbox />
                </ListItemIcon>
                <ListItemText primary={this.props.task.title} secondary={this.props.task.username}/>
                <ListItemSecondaryAction>
                    <IconButton
                        color='primary'
                        onClick={this.deleteThisTask.bind(this)}
                    >
                        <Delete />
                    </IconButton>
                    <Button component={Link} to={`/todolist/${taskId}`} >
                        <Edit />
                    </Button>
                </ListItemSecondaryAction>
            </ListItem>


        );

    }

}

