import React, {Component} from 'react';
import { connect } from "react-redux";
import {Divider, Feed} from 'semantic-ui-react';

import classes from './NutritionTable.module.css';

class NutritionTable extends  Component {
    render() {
        let date = this.props.currentDay*-1;
        let list = this.props.addedItem.data_points[date].intake_list.map((item,key)=>{
            const quantity = item.serving_qty;
            return(
                    <Feed key={key}>
                        <Feed.Event>
                            <Feed.Label style={{margin: '9px'}} >
                                <img src={item.thumb} alt='food' style={{height: '50px', width: '50px', display: 'inline', borderRadius: '3px'}}/>
                            </Feed.Label>
                            <Feed.Content style={{textAlign: 'left'}}>
                                <Feed.Summary style={{paddingBottom: '5px'}}>
                                    {item.food_name}
                                </Feed.Summary>
                                <Feed.Extra text>
                                    {item.serving_qty + ' ' + item.serving_unit + ' (' + item.serving_weight_grams*quantity +' g)'}
                                </Feed.Extra>
                            </Feed.Content>
                            <Feed.Content style={{textAlign: 'right', margin: '9px'}}>
                                <Feed.Summary style={{paddingBottom: '5px'}}>
                                    {item.nf_calories*quantity + ' Cal'}
                                </Feed.Summary>
                                <Feed.Extra text>{item.meal_type}</Feed.Extra>
                            </Feed.Content>
                        </Feed.Event>
                        <Divider style={{marginLeft: '70px'}}/>
                    </Feed>
            );
        });
        return (
            <div className={classes.NutritionTable}>
            {list}
            </div>
        );
    };
}

const mapStateToProps = state => {
    return {
        addedItem: state.addedItem,
        currentDay: state.currentDay,
    }
};

export default connect(mapStateToProps)(NutritionTable);
