import React, {Component} from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui-icons/Menu';
import AccountCircle from '@material-ui-icons/';

const styles = theme => ({
    root: {
        marginTop: theme.spacing.unit *3,
        width: '100%'
    },
    flex: {
        flex: 1
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20
    }
})

class Navbar extends Component {
    render() {
        const {classes} = this.props;

        return (
            <AppBar position="static" elevation={0} className={this.props.open ? classes.navbarSmaller : null}>
                <Toolbar>
                    <IconButton className={classes.menuButton} color="contrast" onClick={this.props.toggleDrawer}><Menu/></IconButton>
                    <Typography className={classes.flex} type="title" color="inherit">
                        Material-UI Demo App
                    </Typography>
                    <div>
                        <IconButton color="contrast" onClick={this.props.login}>
                            <AccountCircle/>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        )
    }
}

Navbar.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Navbar);
