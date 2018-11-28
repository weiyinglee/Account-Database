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
			<div className="row" id="table">
				{
					accounts.map((account, index) => {
						return (
							<div className="col-sm-12">
								<div className="card" key={index}>
								  <div className="card-header">
								   	<h4>{account.name} <button className="btn btn-outline-dark btn-sm">More</button></h4>
								  </div>

								  <div className="card-body">
								    <h5 className="card-title">Type: </h5>
								    <p className="card-text">{account.type}</p>
								    <hr/>
								    <h5 className="card-title">Publication Volume: </h5>
								    <p className="card-text">{account.public}</p>
								    <hr/>
								   	<h5 className="card-title">Author Volume: </h5>
								    <p className="card-text">{account.author}</p>
								    <hr/>
								    <h5 className="card-title">Location: </h5>
								    <p className="card-text">{account.country}</p>
								    <hr/>
								    <h5 className="card-title">Tags: </h5>
								    <p className="card-text">{account.tags}</p>
								  </div>
								</div>

							</div>
						)
					})
				}
			</div>
		)
	}
}

export default DataTable