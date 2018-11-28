//import dependienies
import React from 'react'
import config from '../config'
import { load } from '../helpers/spreadsheet'

class DataTable extends React.Component {

	constructor() {
		super()
		this.state = {
			accounts: [],
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
			    this.setState({ accounts });
			  } else {
			    this.setState({ error });
			  }
			})
		  })
		});
	}

	render() {
		const { accounts, error } = this.state

		if(error) {
			return <div>{this.state.error}</div>
		}

		return (
			<table className="table">
			  <thead className="thead-light">
			    <tr>
			      <th scope="col">Account Name</th>
			      <th scope="col">Account Type</th>
			      <th scope="col">Publication Volume</th>
			      <th scope="col">Author Volume</th>
			      <th scope="col">Location</th>
			      <th scope="col">Tags</th>
			    </tr>
			  </thead>
			  <tbody>
			  {
			  	accounts.map((account, index) => {
			  		return (
					    <tr key={index}>
					      <th scope="row">{account.name}</th>
					      <td>{account.country}</td>
					      <td>{account.public}</td>
					      <td>{account.author}</td>
					      <td>{account.type}</td>
					      <td>{account.tags}</td>
					    </tr>
			  		)
			  	})
			  }
			  </tbody>
			</table>
		)
	}
}

export default DataTable