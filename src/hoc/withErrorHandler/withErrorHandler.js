import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Ax from '../Ax/Ax';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        constructor(props) {
            super(props);
            this.reqInterceptors = axios.interceptors.request.use( request => {
                this.setState({ error: null });
                return request;
            });
            this.resInterceptors = axios.interceptors.response.use(response => response, error => {
                this.setState({ error: error })
            })
        }
        state = {
            error: null
        };

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptors);
            axios.interceptors.response.eject(this.resInterceptors);
        }

        errorConfirmedHandler = () => {
            this.setState({ error: null })
        };

        render () {
            return (
                <Ax>
                    <Modal
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Ax>
            )
        }
    };
};

export default withErrorHandler;