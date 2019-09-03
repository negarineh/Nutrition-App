import React, { Component } from 'react';
import { connect } from "react-redux";
import { Grid } from 'semantic-ui-react';

import SearchInputItems from './SearchInputItems/SearchInputItems';
import classes from './SearchInput.module.css';
import Ax from '../../../hoc/Ax/Ax';

class SearchInput extends Component {
    state = {
        items: [],
        value: '',
        show: this.props.show,
    };

    render() {
        let commonList;
        let brandList;

        if (this.props.searchList) {
            commonList = this.props.searchList.common.slice(0, 5).map((item, key) =>
                <SearchInputItems data={item} counter={key} key={key + 'c'} />
            );
        }

        if (this.props.searchList) {
            brandList = this.props.searchList.branded.slice(0, 5).map((item, key) =>
                <SearchInputItems data={item} counter={key} key={key + 'b'} />
            );
        }

        return (
            <Grid>
                <Grid.Column width={5} style={{margin: '5px'}}>
                </Grid.Column>
                <Grid.Column width={5} style={{margin: '5px', width: '100%'}}>
                    <Ax>
                        <div
                            className={classes.SearchInput}
                            style={{
                                transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                                opacity: this.props.show ? '1' : '0'
                            }}>

                            <div className={classes.Tag}>COMMON</div>
                            {commonList}
                            <hr />
                            <div className={classes.Tag}>BRANDED</div>
                            {brandList}

                        </div>
                    </Ax>
                </Grid.Column>
                <Grid.Column width={6} style={{margin: '5px'}}>
                </Grid.Column>
            </Grid>
        )
    }
}

const mapStateToProps = state => {
    return {
        searchList: state.items,
    }
};

export default connect(mapStateToProps)(SearchInput);
