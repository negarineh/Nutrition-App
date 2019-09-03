import React from 'react';
import { Grid } from 'semantic-ui-react';

import Navbar from '../../components/Navbar/Navbar';
import Profile from '../../components/Profile/Profile';
import NutritionTable from '../../components/NutritionTable/NutritionTable';

const layout = () => {
        return (
            <Grid stackable style={{height: '100%'}} >
                <Grid.Row stretched style={{paddingBottom: '0'}}>
                    <Grid.Column>
                        <Navbar/>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row style={{paddingTop: '0', paddingBottom: '0'}}>
                    <Grid.Column width={6}>
                        <Profile/>
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <NutritionTable/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
};

export default layout;
