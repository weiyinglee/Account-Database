//import dependienies
import React from 'react'
import config from '../config'
import { load } from '../helpers/spreadsheet'

class DataTable extends React.Component {

	constructor() {
		super()
		this.state = {
			accounts: [],
			showTable: [],
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

	changeShow(index) {
		const showTable = this.state.showTable
		showTable[index] = !showTable[index]
		this.setState({ showTable })
	}

	render() {
		const { accounts, error } = this.state

		if(error) {
			return <div>{this.state.error}</div>
		}

		return (
			<div>
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

				<nav id="pages" aria-label="Page navigation example">
				  <ul class="pagination">
				    <li class="page-item">
				      <a class="page-link" href="#" aria-label="Previous">
				        <span aria-hidden="true">&laquo;</span>
				        <span class="sr-only">Previous</span>
				      </a>
				    </li>
				    <li class="page-item"><a class="page-link" href="#">1</a></li>
				    <li class="page-item"><a class="page-link" href="#">2</a></li>
				    <li class="page-item"><a class="page-link" href="#">3</a></li>
				    <li class="page-item"><a class="page-link" href="#">4</a></li>
				    <li class="page-item"><a class="page-link" href="#">5</a></li>
				    <li class="page-item"><a class="page-link" href="#">6</a></li>
				    <li class="page-item"><a class="page-link" href="#">7</a></li>
				    <li class="page-item"><a class="page-link" href="#">8</a></li>
				    <li class="page-item"><a class="page-link" href="#">9</a></li>
				    <li class="page-item"><a class="page-link" href="#">10</a></li>
				    <li class="page-item">
				      <a class="page-link" href="#" aria-label="Next">
				        <span aria-hidden="true">&raquo;</span>
				        <span class="sr-only">Next</span>
				      </a>
				    </li>
				  </ul>
				  <h6 id="page-header">Page 1 / 10</h6>
				</nav>
			</div>
		)
	}
}

export default DataTable