import React, { Component } from 'react';
import { Image, Button, Label, Divider, Progress, Feed } from 'semantic-ui-react';
import { connect } from "react-redux";

import profilePhoto from '../../assets/images/sportGirl.png';
import classes from './Profile.module.css';


class Profile extends Component {
    render() {
        let date = this.props.currentDay * -1;
        let list = this.props.addedItem.data_points[date].intake_list;
        let goal = this.props.addedItem.daily_goal;

        let totalCal = Object.keys(list).reduce((sum, key) => {
            let x = list[key].nf_calories * list[key].serving_qty;
            return sum + x;
        }, 0);

        let percent = parseInt(totalCal / goal * 100);
        let breakfastTotal = 0;
        let lunchTotal = 0;
        let dinnerTotal = 0;
        let snackTotal = 0;

        for (let c = 0; c < list.length; c++) {
            switch (list[c].meal_type) {
                case "breakfast":
                    breakfastTotal += list[c].nf_calories * list[c].serving_qty;
                    break;
                case "lunch":
                    lunchTotal += list[c].nf_calories * list[c].serving_qty;
                    break;
                case "dinner":
                    dinnerTotal += list[c].nf_calories * list[c].serving_qty;
                    break;
                case "snack":
                    snackTotal += list[c].nf_calories * list[c].serving_qty;
                    break;
                default:
                    break;
            }

        }
        return(
            <div className={classes.Profile}>
                <div  >
                    <Button as='label' inline='true' circular color='grey' size='big' style={{margin: 'auto', fontSize: '15px', borderRadius: '50%', width:'60px', height: '60px', padding: 'auto' }} >
                        {this.props.addedItem.weight_kg}<br/> kg
                    </Button>
                    <Image inline src={profilePhoto} size='small' circular style={{margin: '5px'}} />
                    <Button as='label' inline='true' circular color='grey' size='big' style={{margin: 'auto', fontSize: '15px', borderRadius: '50%', width:'60px', height: '60px', padding: 'auto' }} >
                        {this.props.addedItem.height_cm}<br/> kilo
                    </Button>
                </div>
                <Label>{this.props.addedItem.first_name + ' ' + this.props.addedItem.last_name}</Label>
                <Divider style={{width: '100%', color: 'dark grey'}}/>
                <Feed>
                    <Feed.Event>
                        <Feed.Content>
                            <Feed.Summary style={{paddingBottom: '5px'}}>
                                {Math.floor(totalCal)} cal
                            </Feed.Summary>
                            <Feed.Date>consumed</Feed.Date>
                        </Feed.Content>
                        <Feed.Content style={{textAlign: 'right'}}>
                            <Feed.Summary style={{paddingBottom: '5px'}}>
                                {this.props.addedItem.daily_goal} cal
                            </Feed.Summary>
                            <Feed.Date>daily goal</Feed.Date>
                        </Feed.Content>
                    </Feed.Event>
                </Feed>
                <Progress percent={percent} size='tiny' color='blue' style={{borderRadius: '0'}}/>
                <label>{percent}%</label>
                <Feed>
                    <Feed.Event>
                        <Feed.Content style={{textAlign: 'center'}}>
                            <Feed.Summary style={{paddingBottom: '5px'}}>
                                {Math.floor(breakfastTotal)}
                            </Feed.Summary>
                            <Feed.Label  style={{paddingBottom: '5px', color: 'grey'}}>Breakfast</Feed.Label>
                        </Feed.Content>
                        <Feed.Content style={{textAlign: 'center'}}>
                            <Feed.Summary style={{paddingBottom: '5px'}}>
                                {Math.floor(lunchTotal)}
                            </Feed.Summary>
                            <Feed.Label  style={{paddingBottom: '5px', color: 'grey'}}>Launch</Feed.Label>
                        </Feed.Content>
                        <Feed.Content style={{textAlign: 'center'}}>
                            <Feed.Summary style={{paddingBottom: '5px'}}>
                                {Math.floor(dinnerTotal)}
                            </Feed.Summary>
                            <Feed.Label  style={{paddingBottom: '5px', color: 'grey'}}>Dinner</Feed.Label>
                        </Feed.Content>
                        <Feed.Content style={{textAlign: 'center'}}>
                            <Feed.Summary style={{paddingBottom: '5px'}}>
                                {Math.floor(snackTotal)}
                            </Feed.Summary>
                            <Feed.Label  style={{paddingBottom: '5px', color: 'grey'}}>Snack</Feed.Label>
                        </Feed.Content>
                    </Feed.Event>
                </Feed>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        addedItem: state.addedItem,
        currentDay: state.currentDay,
    }
};

export default connect(mapStateToProps)(Profile);