import React, { Component } from 'react';
import { connect } from "react-redux";

import * as actions from '../../../../store/actions';
import classes from './SearchInputItems.module.css';
import Ax from '../../../../hoc/Ax/Ax';

class SearchInputItems extends Component {

    handleSelect = () => {
        this.props.onSelected(this.props.data);
    };

    render() {
        let hr;
        if (this.props.counter <4){
            hr = <hr />
        }

        return(
            <Ax>
                <div className={classes.Container} >
                    <div className={classes.ImgContainer} >
                        <img className={classes.Image} src={this.props.data.photo.thumb} alt={this.props.data.food_name} />
                        <label className={classes.Text} onClick={this.handleSelect}>
                            {this.props.data.food_name.length<30 ? this.props.data.food_name : this.props.data.food_name.slice(0,30)+"..."}
                        </label>
                        <br/>
                        <div className={classes.BrandName}>
                            {this.props.data.brand_name}
                        </div>
                    </div>
                    {hr}
                </div>
            </Ax>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSelected: (selectedItem) => dispatch(actions.selectItem(selectedItem))
    }
};

export default connect (null, mapDispatchToProps)(SearchInputItems);