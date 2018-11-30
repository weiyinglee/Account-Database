/* eslint-disable */

//import dependienies
import React from 'react'
import config from '../config'
import { load } from '../helpers/spreadsheet'

class DataTable extends React.Component {

	constructor(props) {
		super(props)
		this.minimunPage = 1
		this.numberOfShowPerPage = 10
		this.state = {
			accounts: [],
			filteredAccounts: [],
			pageNumber: 1,
			maximumPage: 1,
			error: null
		}
	}

	//load the data from google sheets
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
			    let accounts = data.accounts
			    let filteredAccounts = accounts
			    this.setState({ 
			    	accounts,
			    	filteredAccounts,
			    	maximumPage: Math.ceil(accounts.length / this.numberOfShowPerPage)
			    });
			  } else {
			    this.setState({ error });
			  }
			})
		  })
		})		
	}

	//update the data after the filter
	componentWillReceiveProps(nextProps) {

		let { accounts } = this.state
		let filter = nextProps.filters
		let filteredAccounts = []

		const matchesTags = (arr1, arr2) => {
			for(let i = 0; i < arr2.length; i++) {
				if(!arr1.includes(arr2[i])) return false
			}
			return true
		}

		for(let i = 0; i < accounts.length; i++) {
			let account = accounts[i]

			if(filter.type != null && account.type != filter.type) continue
			if(filter.country.length != 0 && !filter.country.includes(account.country)) continue
			if(filter.public[0] > account.public || filter.public[1] < account.public) continue
			if(filter.author[0] > account.author || filter.author[1] < account.author) continue
			if(filter.tags.length != 0 && !matchesTags(account.tags.split(', '), filter.tags)) continue

			filteredAccounts.push(account)
		}


		let maximumPage = Math.ceil(filteredAccounts.length / this.numberOfShowPerPage)
		if(maximumPage <= 0) maximumPage = 1

		let pageNumber = this.state.pageNumber
		if(pageNumber > maximumPage) pageNumber = maximumPage

		this.setState({
			filteredAccounts,
			pageNumber,
			maximumPage
		})
	}

	//handle the increment/decrement of page
	changePageNumber(isIncrement) {
		let pageNumber = parseInt(this.state.pageNumber)
		let maximumPage = this.state.maximumPage
		let minimunPage = this.minimunPage

		if(isIncrement) pageNumber++
		else pageNumber--

		//prevent page out of bound
		if(pageNumber <= 0) pageNumber = minimunPage
		else if(pageNumber > maximumPage) pageNumber = maximumPage

		//update the page number
		this.setState({ pageNumber })
	}

	//handle the input onchange for page
	handleChangePageNumber(e) {
		let pageNumber = e.target.value
		let maximumPage = this.state.maximumPage
	 	let minimunPage = this.minimunPage

		//prevent page out of bound
		if(pageNumber > maximumPage) pageNumber = maximumPage
		else if(pageNumber <= 0 || pageNumber == '') pageNumber = minimunPage

		//update the page number
		this.setState({ pageNumber })
	}

	render() {
		const { accounts, filteredAccounts, pageNumber, maximumPage, error } = this.state

		let endEntry = pageNumber * this.numberOfShowPerPage
		let startEntry = endEntry - this.numberOfShowPerPage

		//handle error message page
		if(error) {
			return <div>{this.state.error}</div>
		}

		return (
			<div>
				<nav aria-label="Page navigation example">
				  <ul className="pagination">
				    <li className="page-item">
				      <a href="#" aria-label="Previous" className="text-dark" onClick={this.changePageNumber.bind(this, false)}>
				        <span aria-hidden="true">&laquo;</span>
				        <span className="sr-only">Previous</span>
				      </a>
				    </li>
					<li className="page-item">Page { pageNumber } / { maximumPage }</li>
				    <li className="page-item">
				      <a href="#" aria-label="Next" className="text-dark" onClick={this.changePageNumber.bind(this, true)}>
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
				      <th className="col-3" scope="col">Instutition</th>
				      <th className="col-2" scope="col">Type</th>
				      <th className="col-2" scope="col">Publication Vol.</th>
				      <th className="col-2" scope="col">Author Vol.</th>
				      <th className="col-2" scope="col">Location</th>
				      <th className="col-1" scope="col">Tags</th>
				    </tr>
				  </thead>
				  <tbody>
				   {
				   		filteredAccounts.slice(startEntry, endEntry).map((account, index) => {
				   			return (
							    <tr className="d-flex" key={index}>
							      <th className="col-3" scope="row">{account.name}</th>
							      <td className="col-2">{account.type}</td>
							      <td className="col-2">{account.public}</td>
							      <td className="col-2">{account.author}</td>
							      <td className="col-2">{account.country}</td>
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