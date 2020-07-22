import React, { Component } from 'react';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Products from './Products';
import fetchProducts from '../actions/fetchProducts';
import Footer from './footer';
import '../style/product.css';

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchProducts());
  }

  render() {
    const { pending, error } = this.props;
    if (pending === true || error === true) {
      return (
        <div className="text-center pt-5">
          <div className="spinner-grow spinner" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>

      );
    }
    return (
      <Container fluid className="pl-0 pr-0">
        <Row className="m-0">
          <Products />
        </Row>
        <Row className="nav-row m-0">
          <Footer />
        </Row>
      </Container>
    );
  }
}

export default connect(state => ({
  pending: state.loading,
  error: state.error,
}))(App);
