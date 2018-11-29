//import dependienies
import React from 'react'
import config from '../config'
import { load } from '../helpers/spreadsheet'

class DataTable extends React.Component {

	constructor() {
		super()
		this.state = {
			accounts: [],
			pageNumber: 1,
			error: null
		}
	}

	componentDidMount() {
	  	// 1. Load the JavaScript client library.
	  	window.gapi.load("client", () => {
		  // 2. Initialize the JavaScript client library.
		  window.gapi.client
		    .init({
		      apiKey: config.apiKey,
		      // Your API key will be automatically added to the Discovery Document URLs.
		      discoveryDocs: config.discoveryDocs
		    })
		    .then(() => {
		    // 3. Initialize and make the API request.
		    load((data, error) => {
			  if (data) {
			    const accounts = data.accounts;
			    this.setState({ 
			    	accounts: accounts,
			    	showTable: new Array(accounts.length).fill(false)
			    });
			  } else {
			    this.setState({ error });
			  }
			})
		  })
		});
	}

	changePageNumber(isIncrement, val) {
		let pageNumber = this.state.pageNumber

		if(isIncrement) pageNumber += val
		else pageNumber = val

		if(pageNumber <= 0) pageNumber = 1
		else if(pageNumber > 50) pageNumber = 50

		this.setState({ pageNumber })
	}

	handleChangePageNumber(e) {
		let value = e.target.value

		if(value > 50) value = 50
		else if(value <= 0 || value == '') value = 1

		this.setState({ pageNumber: value })
	}

	render() {
		const { accounts, pageNumber, error } = this.state

		//handle error message page
		if(error) {
			return <div>{this.state.error}</div>
		}

		return (
			<div>
				<nav aria-label="Page navigation example">
				  <ul className="pagination">
				    <li className="page-item">
				      <a href="#" aria-label="Previous" className="text-dark" onClick={this.changePageNumber.bind(this, true, -1)}>
				        <span aria-hidden="true">&laquo;</span>
				        <span className="sr-only">Previous</span>
				      </a>
				    </li>
					<li className="page-item">Page { pageNumber } / 50</li>
				    <li className="page-item">
				      <a href="#" aria-label="Next" className="text-dark" onClick={this.changePageNumber.bind(this, true, 1)}>
				        <span aria-hidden="true">&raquo;</span>
				        <span className="sr-only">Next</span>
				      </a>
				    </li>
				    <li className="page-item">
						<input type="number" id="page-input" min="1" max="50" placeholder="Enter page" onChange={this.handleChangePageNumber.bind(this)}/>
				    </li>
				  </ul>
				</nav>
				<table className="table">
				  <thead className="thead-light">
				    <tr className="d-flex">
				      <th className="col-4" scope="col">Instutition</th>
				      <th className="col-2" scope="col">Type</th>
				      <th className="col-2" scope="col">Publication Vol.</th>
				      <th className="col-2" scope="col">Author Vol.</th>
				      <th className="col-1" scope="col">Location</th>
				      <th className="col-1" scope="col">Tags</th>
				    </tr>
				  </thead>
				  <tbody>
				   {
				   		accounts.slice(0, 50).map((account, index) => {
				   			return (
							    <tr className="d-flex">
							      <th className="col-4" scope="row">{account.name}</th>
							      <td className="col-2">{account.type}</td>
							      <td className="col-2">{account.public}</td>
							      <td className="col-2">{account.author}</td>
							      <td className="col-1">{account.country}</td>
							      <td className="col-1">{account.tags}</td>
							    </tr>
				   			)
				   		})

				   }
				  </tbody>
				</table>
			</div>
		)
	}
}

export default DataTable