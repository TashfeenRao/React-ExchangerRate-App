import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Products from './Products';
import fetchProducts from '../../actions/fetchProducts';
import Spinner from '../presentational/spinner';
import '../../style/product.css';

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchProducts());
  }

  render() {
    const { pending, error } = this.props;
    if (pending === true) return <Spinner />;
    if (error === true) return <h1>Error</h1>;
    return (
      <Container fluid className="pl-0 pr-0">
        <Row className="m-0">
          <Products />
        </Row>
      </Container>
    );
  }
}
App.defaultProps = {
  dispatch: () => undefined,
  pending: false,
};

App.propTypes = {
  dispatch: PropTypes.func,
  pending: PropTypes.bool,
};

export default connect(state => ({
  pending: state.loading,
  error: state.error,
}))(App);
