import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

export default class AlchemAddProducts extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      pictures: '',
      price: 0,
      categoryId: 0,
      description: '',
      submitted: false,
      newProdId: 0
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  async handleSubmit(event) {
    event.preventDefault()
    const newProd = await axios.post('/api/products', this.state)
    this.setState({submitted: true, newProdId: newProd.data.id})
  }

  render() {
    const handleBack = this.props.backFunc
    if (this.state.submitted) {
      return (
        <div style={{display: 'flex', zIndex: '50'}} id="successAddProd">
          <div>
            <h2>A NEW PRODUCT IS MADE!</h2>
            <h3>They are going to love it!</h3>
            <img src="/pictures/gslogopic.jpg" />
            {/* <!-- Link to new product  --> */}
            <Link to={`/allproducts/${this.state.newProdId}`} className="btn">
              See New Product
            </Link>
            {/* <!-- Link back to Alchemist View --> */}
            <Link className="btn" onClick={() => handleBack('')}>
              Back To Alchemist Cabinet
            </Link>
          </div>
        </div>
      )
    }
    return (
      <section id="addProdSection">
        <div style={{display: 'flex', zIndex: '50'}}>
          <h1>Add Product</h1>
          <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
            <ul>
              <li>
                <input
                  required
                  name="name"
                  type="text"
                  placeholder="Product Name"
                />
              </li>
              <li>
                <input
                  name="pictures"
                  required
                  type="text"
                  placeholder="Separate Picture Links: ', '"
                />
              </li>
              <li>
                <input
                  name="price"
                  required
                  type="number"
                  placeholder="Price"
                  min="100"
                  max="100000"
                />
              </li>
              <li>
                <select name="categoryId" defaultValue="0">
                  <option disabled value="0">
                    Category
                  </option>
                  <option value="1">Emotions</option>
                  <option value="2">Elixirs</option>
                  <option value="3">Relics</option>
                  <option value="4">Conduits</option>
                  <option value="5">Literature</option>
                </select>
              </li>
              <li>
                <textarea
                  required
                  name="description"
                  placeholder="Description"
                />
              </li>
              <li>
                <button className="btn btn-gold btnToWhite" type="submit">
                  ADD
                </button>
                <Link className="btn btnToWhite" onClick={() => handleBack('')}>
                  CANCEL
                </Link>
              </li>
            </ul>
          </form>
        </div>
      </section>
    )
  }
}
