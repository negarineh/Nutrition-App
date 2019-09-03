import React, { Component } from 'react';
import {Button, Modal, Dropdown, Image, Form, Input} from 'semantic-ui-react';
import { connect } from 'react-redux';

import * as actions from '../../../../store/actions';

class AddForm extends Component {
    state = {
        mealType: [
            {
                key: 'breakfast',
                text: 'Breakfast',
                value: 'breakfast',
            },
            {
                key: 'launch',
                text: 'Launch',
                value: 'launch',
            },
            {
                key: 'dinner',
                text: 'Dinner',
                value: 'dinner',
            },
            {
                key: 'snack',
                text: 'Snack',
                value: 'snack',
            },
        ],
        selectedMealType: 'breakfast',
        serving: 1,
        cal: 0,
        gram: 0,
        // selectedItems: [],
    };


    handleChange = (event) => this.setState({serving: event.target.value});
    handleMealTypeClick = (e, { value }) => this.setState({ selectedMealType: value });
    handleAddButton = () => {
        let data = {};
        let cal = this.props.selectedItem.full_nutrients.find((item) => item.attr_id === 208);
        if( this.state.serving > 0) {
            data = {
                nix_item_id: this.props.selectedItem.nix_item_id,
                food_name: this.props.selectedItem.food_name,
                serving_unit: this.props.selectedItem.serving_unit,
                serving_weight_grams: this.props.selectedItem.serving_weight_grams,
                serving_qty: this.state.serving,
                nf_calories: cal.value,
                serving_size: this.props.selectedItem.serving_size,
                meal_type: this.state.selectedMealType,
                thumb: this.props.selectedItem.photo.thumb
            }
        }

        this.props.onAddedItem(data);
    };

    render() {
        let calories = {value: 0};
        if (this.props.selectedItem) {
            calories = this.props.selectedItem.full_nutrients.find((item) => item.attr_id === 208);
        }
        return (
            <div>
                {this.props.selectedItem &&
                    <Modal size='mini' open={this.props.showAddForm} style={{backgroundColor: 'rgba(0,0,0,0.02)'}}>
                        <Modal.Header>
                            <Button icon='close' style={{float: 'right', padding: '0', margin: '0', backgroundColor: 'white'}} onClick={this.props.onCloseAddItem}/>
                            <Image inline src={this.props.selectedItem.photo.thumb} size='small' circular style={{margin: '5px'}} />
                            <p>{this.props.selectedItem.food_name}</p>
                        </Modal.Header>
                        <Modal.Content>
                            <Form>
                                <Form.Group widths='equal'>
                                    <Form.Field style={{marginRight: '20%', width: '40%'}}>
                                        <label>serving</label>
                                        <Input style={{ background: 'lightgray' }} type="number" onChange={this.handleChange} value={this.state.serving}/>
                                        <label>slice</label>
                                    </Form.Field>
                                    <Form.Field>
                                        <label style={{marginBottom: '25px'}}>
                                            {Math.floor(this.props.selectedItem.serving_weight_grams * this.state.serving)}
                                        </label>
                                        <label>grams</label>
                                    </Form.Field>
                                    <Form.Field>
                                        <label style={{marginBottom: '25px'}}>
                                            {Math.floor(calories.value * this.state.serving)}
                                        </label>
                                        <label>calories</label>
                                    </Form.Field>
                                </Form.Group>
                            </Form>
                            <p>ADD TO TODAY</p>
                            <Dropdown
                                defaultValue={this.state.mealType[0].value}
                                fluid
                                selection
                                options={this.state.mealType}
                                onChange={this.handleMealTypeClick}
                            />
                        </Modal.Content>
                        <Modal.Actions>
                            <Button
                                color='linkedin'
                                onClick={this.handleAddButton}
                            >ADD
                            </Button>
                        </Modal.Actions>
                    </Modal>
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        selectedItem: state.selectedItem,
        showAddForm: state.showAddForm,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAddedItem: (addedItem) => dispatch(actions.addItem(addedItem)),
        onCloseAddItem: () => dispatch(actions.closeAddItem()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddForm);