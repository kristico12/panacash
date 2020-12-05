// dependencies
import React, { Fragment, Component } from 'react';
import { Grid, Container } from '@material-ui/core';
// components
import SaveProduct from '../components/saveProducts.jsx';
import ListProduct from '../components/listProducts.jsx';
// imports
import { typeCall } from '../utils/constans';
import { Call } from '../utils/call';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: []
        }
    }
    async getProducts() {
        const result = await Call('/api/product', typeCall.GET);
        if (result.hasOwnProperty('data')) {
            this.setState({products: result.data});
        }
    }
    componentDidMount() {
        this.getProducts();
    }
    render() {
        return (
            <Fragment>
                <Container>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <ListProduct getProducts={() => this.getProducts()} products={this.state.products} />
                        </Grid>
                        <Grid item xs={12}>
                            <SaveProduct getProducts={() => this.getProducts()} />
                        </Grid>
                    </Grid>    
                </Container>
            </Fragment>
        );
    }
}

export default App;