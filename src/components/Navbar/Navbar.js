import React, { Component } from 'react';
import { connect } from "react-redux";

import classes from './Navbar.module.css';
import SearchInput from './SearchInput/SearchInput';
import * as actions from '../../store/actions';
import AddForm from "./SearchInput/AddForm/AddForm";
import axios from '../../axios-nutritionix';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Navbar extends Component {
    state = {
        searching: false,
    };
    handleChange = (e) => {
        this.props.onSearchItems(e.target.value);
        this.setState({
        searching: this.props.searching,
        });
    };

    handleClose = (e) => {
        if (e.key === 'Escape') {
            this.setState({ searching: false })
        }
    };

    render() {
        let bBtn = "<";

        let day;

        if (this.props.date === 0) {
            day = <div>Today</div>
        } else if (this.props.date === -1) {
            day = <div>Yesterday</div>
        } else {
            let d = new Date();
            d.setDate(d.getDate() - 2);
            const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
            let formatted_date = d.getDate() + " " + months[d.getMonth()];
            day = <div>{formatted_date}</div>
        }

        return (
            <div style={{backgroundColor: '#6200EE', height: '125px', marginBottom: '0', width: '100%', alignItems: 'center'}}>
                <div className={classes.DropdownContent}>
                    <input onChange={this.handleChange} onKeyDown={this.handleClose} type="text" className={classes.Input} placeholder="Search food..." />

                    <div className={classes.DateControl}>
                        <button  disabled={this.props.date <= -2} onClick={this.props.onPreviousDay}>{bBtn}</button>
                        <div>{day}</div>
                        <button  disabled={this.props.date >= 0} onClick={this.props.onNextDay}>></button>
                    </div>
                </div>
                <SearchInput show={this.state.searching}/>
                {this.props.selectedItem&& <AddForm />}

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        searching: state.searching,
        date: state.currentDay,
        selectedItem: state.selectedItem,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onSearchItems: (name) => dispatch(actions.searchItems(name)),
        onNextDay: () => dispatch(actions.nextDay()),
        onPreviousDay: () => dispatch(actions.previousDay()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Navbar,axios));