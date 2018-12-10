/* eslint-disable */
//import dependencies
import React, { Component } from 'react'

class Pagination extends Component {

	constructor(props) {
		super(props)
		this.state = {
			pageNumber: props.pageNumber,
			maximumPage: props.maximumPage
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ pageNumber: nextProps.pageNumber, maximumPage: nextProps.maximumPage })
	}

	//handle the increment/decrement of page
	changePageNumber(isIncrement) {
		this.props.changePageNumber(isIncrement)
	}

	//handle the input onchange for page
	handleChangePageNumber(e) {
		this.props.handleChangePageNumber(e)
	}

	render() {
		let { pageNumber, maximumPage } = this.state
		return (
		    <nav aria-label="Page navigation example">
		      <div className="page-section">
				  <ul className="pagination">
				    <li className="page-item">
				      <a href="#/" aria-label="Previous" className="text-dark" onClick={this.changePageNumber.bind(this, false)}>
				        <span aria-hidden="true">&laquo;</span>
				        <span className="sr-only">Previous</span>
				      </a>
				    </li>
					<li className="page-item">Page { pageNumber } / { maximumPage }</li>
				    <li className="page-item">
				      <a href="#/" aria-label="Next" className="text-dark" onClick={this.changePageNumber.bind(this, true)}>
				        <span aria-hidden="true">&raquo;</span>
				        <span className="sr-only">Next</span>
				      </a>
				    </li>
				    <li className="page-item">
						<input type="number" id="page-input" min="1" max={maximumPage} placeholder="Enter page" onChange={this.handleChangePageNumber.bind(this)}/>
				    </li>
				  </ul>
			  </div>
			</nav>
		)
	}
}

export default Pagination