/* eslint-disable */

//import dependienies
import React from 'react'
import config from '../config'
import { load } from '../helpers/spreadsheet'

class DataTable extends React.Component {

	constructor(props) {
		super(props)
		this.minimunPage = 1
		this.numberOfShowPerPage = 20
		this.state = {
			DataSets: [],
			filteredDataSets: [],
			pageNumber: 1,
			maximumPage: 1,
			beSelected: [],
			selected: [],
			error: null
		}
	}

	//load the data from google sheets
	componentWillMount() {
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
			    let DataSets = data.DataSets
			    let filteredDataSets = DataSets
			    this.setState({ 
			    	DataSets,
			    	filteredDataSets,
			    	show: new Array(DataSets.length).fill(false),
			    	beSelected: new Array(DataSets.length).fill(false),
			    	maximumPage: Math.ceil(DataSets.length / this.numberOfShowPerPage)
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

		let { DataSets } = this.state
		let filter = nextProps.filters
		let filteredDataSets = []


		const matchPrefix = (prefix, str) => {
			prefix = prefix.toLowerCase()
			str = str.toLowerCase()

			console.log(prefix, str)

			if(prefix.length > str.length) return false
			for(let i = 0; i < prefix.length; i++) {
				if(prefix[i] != str[i]) return false
			}
			return true
		}

		for(let i = 0; i < DataSets.length; i++) {
			let dataSet = DataSets[i]

			if(filter.manufacturer != "" && !matchPrefix(filter.manufacturer, dataSet.manufacturer)) continue

			filteredDataSets.push(dataSet)
		}


		let maximumPage = Math.ceil(filteredDataSets.length / this.numberOfShowPerPage)
		if(maximumPage <= 0) maximumPage = 1

		let pageNumber = this.state.pageNumber
		if(pageNumber > maximumPage) pageNumber = maximumPage

		this.setState({
			filteredDataSets,
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

	selected(index) {
		let { beSelected, selected } = this.state
		beSelected[index] = !beSelected[index]
		selected.push(this.state.DataSets[index])
		this.setState({ beSelected, selected })
	}

	clearList() {
		let { beSelected, selected, filteredDataSets, DataSets} = this.state
		for(let i = 0; i < beSelected.length; i++) {
			beSelected[i] = false
		}
		selected = []
		filteredDataSets = DataSets
		this.setState({ filteredDataSets, beSelected, selected })
	}

	compareList() {
		let filteredDataSets = []
		for(let i = 0; i < this.state.selected.length; i++) {
			let account = this.state.selected[i]
			filteredDataSets.push(account)
		}
		this.setState({ filteredDataSets})
	}

	render() {
		const { DataSets, filteredDataSets, pageNumber, maximumPage, beSelected, selected, error } = this.state

		let endEntry = pageNumber * this.numberOfShowPerPage
		let startEntry = endEntry - this.numberOfShowPerPage

		//handle error message page
		if(error) {
			return <div>{this.state.error}</div>
		}

		let compareForm = ''
		if(selected.length != 0) {
			compareForm = (
				<li className="page-item">
					<button className="btn btn-outline-dark" onClick={this.compareList.bind(this)}>Compare</button>
					<button className="btn btn-outline-dark" onClick={this.clearList.bind(this)}>Clear list</button>
				</li>	
			)
		}

		return (
			<div>
				<h6 id="count-result"> - {filteredDataSets.length} results -</h6>
				<hr />
				<div className="card-group row">
			   {
			   		filteredDataSets.slice(startEntry, endEntry).map((dataSet, index) => {
			   			return (
			   				<div className="col-sm-3" key={index}>
								<div className="card d-flex">
								  <div className="card-header">
								    {dataSet.manufacturer}
								  </div>
								  <div className="card-body flex-fill">
									  <ul className="list-group list-group-flush">
									    <li className="list-group-item">Liquid Biopsy Product: {dataSet.product}</li>
									    <li className="list-group-item">Sensitivity: {dataSet.sensitivity}</li>
									    <li className="list-group-item">TAT:{dataSet.tat}</li>
									    <li className="list-group-item">Regulatory: {dataSet.regulatory}</li>
									    <li className="list-group-item">Score: {dataSet.score}</li>
									  </ul>
								  </div>
								  <button className="btn btn-sm btn-outline-success" onClick={this.selected.bind(this, index)}>{beSelected[index] ? 'Selected' : 'Compare'}</button>
								</div>
							</div>
			   			)
			   		})

			   }
			    </div>
			    <hr />
			    <nav aria-label="Page navigation example">
			      <div className="page-section">
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
				  </div>
				</nav>
			</div>
		)
	}
}

export default DataTable