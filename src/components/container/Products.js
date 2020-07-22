import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import CardColumns from 'react-bootstrap/CardColumns';
import filterProducts from '../../actions/filterProducts';
import '../../style/product.css';

class Products extends Component {
  constructor(props) {
    super(props);
    this.filterCurrencies = this.filterCurrencies.bind(this);
  }

  filterCurrencies(e) {
    const { dispatch } = this.props;
    dispatch(filterProducts(e.target.value));
  }

  render() {
    const {
      products, filters,
    } = this.props;
    const prodArray = Object.entries(products);
    const filteredProducts = () => ((filters !== '') ? prodArray.filter(prod => prod[0].includes(filters.toUpperCase())) : prodArray);
    // const filteredProducts = () => ((filters !== '') ? products.filter(prod => prod.name.toLowerCase().includes(filters.toLowerCase())) : products);
    //    <img src={require('../images/USD.svg')} alt="logo" />
    return (
      <Container>
        <Form.Group className="mt-2">
          <Form.Row>
            <Button variant="info" size="md" disabled className="search-button">
              Filter By
            </Button>
            <Col className="pl-0 pr-0">
              <Form.Control size="lg" type="text" placeholder="Company Name" onChange={e => this.filterCurrencies(e)} />
            </Col>
          </Form.Row>
        </Form.Group>
        <Row>
          <Col className="currencyContainer">
            <CardColumns>
              {filteredProducts().map((item, index) => (
                <Link to={`/item/${index}`} key={index}>
                  <Card text="white" className="text-center p-3 companyBox">
                    <blockquote className="blockquote mb-0 card-body">
                      <p>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form</p>
                      <p>
                        {item[0]}
                      </p>
                      <footer className="blockquote-footer">
                        <small className="text-muted">
                          Someone famous in
                          {' '}
                          <cite title="Source Title">Source Title</cite>
                        </small>
                      </footer>
                    </blockquote>
                  </Card>
                </Link>
              ))}
              {' '}
              {(filteredProducts().length === 0) && (<h1>Nothing found</h1>)}
            </CardColumns>
          </Col>
        </Row>
      </Container>
    );
  }
}
export default connect(state => ({
  products: state.products,
  filters: state.input,
}))(Products);