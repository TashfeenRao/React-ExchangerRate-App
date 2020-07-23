import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CardColumns from 'react-bootstrap/CardColumns';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Nothing from '../presentational/nothing';

const CardColumn = props => {
  const {
    products, filters,
  } = props;
  const filteredProducts = () => ((filters !== '') ? products.filter(prod => prod.symbol.toLowerCase().includes(filters.toLowerCase())) : products);
  //    <img src={require('../images/USD.svg')} alt="logo" />
  return (
    <CardColumns>
      {filteredProducts().map((item, index) => (
        <Link to={`/item/${index}`} key={item.symbol}>
          <Card text="white" className="text-center p-3 companyBox">
            <blockquote className="blockquote mb-0 card-body">
              <p>{item.companyName}</p>
              <p>
                {item.symbol}
              </p>
              <p>{item.price}</p>
              <p>{item.country}</p>
            </blockquote>
          </Card>
        </Link>
      ))}
      {' '}
      {(filteredProducts().length === 0) && (<Nothing />)}
    </CardColumns>
  );
};

CardColumn.defaultProps = {
  products: [],
  filters: '',
  filter: () => undefined,
  toLowerCase: () => undefined,
};
CardColumn.propTypes = {
  filters: PropTypes.string,
  filter: PropTypes.func,
  toLowerCase: PropTypes.func,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      companyName: PropTypes.string,
      symbol: PropTypes.string,
    }),
  ),
};
export default connect(state => ({
  products: state.products,
  filters: state.input,
}))(CardColumn);
