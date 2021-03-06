import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {SlimProduct} from './cartSingleItem'
import {getCartThunk} from '../store/order'

class CartComponent extends React.Component {
  async componentDidMount() {
    await this.props.getCart()
    console.log('cart: ', this.props.cart)
  }

  render() {
    let cart = this.props.cart
    if (!cart.id) {
      cart.price = 0
    }
    return (
      <section id="cartSection">
        <div id="theCart">
          <h1>Welcome To Your Cart</h1>
          {cart.products &&
            cart.products.map(product => {
              return <SlimProduct key={product.id} product={product} />
            })}
          <hr />
          <p>
            Subtotal: <span>{cart.price} ¤</span>
          </p>
        </div>
        <div id="theSummary">
          <div>
            <h2>Order Summary</h2>
            <p>
              Subtotal: <span>{cart.price} ¤</span>
            </p>
            <p>
              Estimated Taxes: <span>{cart.price * 0.05} ¤</span>
            </p>
            <hr />
            <p>
              Total: <span>{cart.price * 1.05}¤</span>
            </p>
            <Link to="/checkout" className="btn btn-gold">
              Proceed To Checkout
            </Link>
          </div>
        </div>
      </section>
    )
  }
}

const mapState = state => {
  return {
    cart: state.order
  }
}

const mapDispatch = dispatch => {
  return {
    getCart: async () => dispatch(await getCartThunk())
  }
}

export const Cart = connect(mapState, mapDispatch)(CartComponent)
