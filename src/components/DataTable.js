/* eslint-disable */

//import dependienies
import React from 'react'
import config from '../config'
import { load } from '../helpers/spreadsheet'

//import components
import FilterPanel from './FilterPanel'

class DataTable extends React.Component {

	constructor(props) {
		super(props)
		this.minimunPage = 1
		this.numberOfShowPerPage = 15
		this.state = {
			DataSets: [],
			filteredDataSets: [],
			pageNumber: 1,
			maximumPage: 1,
			selected: new Map(),
			compareState: false,
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

			if(prefix.length > str.length) return false
			for(let i = 0; i < prefix.length; i++) {
				if(prefix[i] != str[i]) return false
			}
			return true
		}

		//filter by
		for(let i = 0; i < DataSets.length; i++) {
			let dataSet = DataSets[i]

			if(filter.manufacturer != "" && !matchPrefix(filter.manufacturer, dataSet.manufacturer)) continue

			filteredDataSets.push(dataSet)
		}	

		//sort by
		filteredDataSets.sort((a, b) => {
			switch(filter.sortBy) {
				case 'None':
					return 0
				case 'Name':
					if(a.manufacturer < b.manufacturer) return -1
					else if(b.manufacturer < a.manufacturer) return 1
					return 0
					break
				case 'Sensitivity':
					return parseInt(b.sensitivity) - parseInt(a.sensitivity)
					break
				case 'TAT':
					return parseInt(b.tat) - parseInt(a.tat)
					break
				case 'Regulatory':
					return parseInt(b.regulatory) - parseInt(a.regulatory)
					break
				case 'Score':
					return parseInt(b.score) - parseInt(a.score)
					break
				default:
					break
			}
		})

		let maximumPage = Math.ceil(filteredDataSets.length / this.numberOfShowPerPage)
		if(maximumPage <= 0) maximumPage = 1

		let pageNumber = this.state.pageNumber
		if(pageNumber > maximumPage) pageNumber = maximumPage

		this.setState({
			filteredDataSets,
			pageNumber,
			maximumPage,
			selected: filter.selected,
			compareState: filter.compareState
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

	selected(id) {
		let { selected } = this.state
		if(selected.has(id)) { 
			this.props.removeSelected(id)
		}
		else { 
			this.props.addSelected(id, this.state.DataSets[id])
		}
		this.setState({ selected })
	}

	clearList() {
		let { filteredDataSets, DataSets} = this.state
		filteredDataSets = DataSets
		this.setState({ filteredDataSets })
		this.props.clearSelected()
	}

	compareList() {
		this.props.compareSelected()
	}

	render() {
		const { DataSets, filteredDataSets, pageNumber, maximumPage, selected, compareState, error } = this.state

		let endEntry = pageNumber * this.numberOfShowPerPage
		let startEntry = endEntry - this.numberOfShowPerPage

		//handle error message page
		if(error) {
			return <div>{this.state.error}</div>
		}

		let compareForm = ''
		let filterForm = ''
		let dataSets = filteredDataSets.slice(startEntry, endEntry)

		if(selected.size != 0) {
			compareForm = (
				<div class="alert alert-secondary" role="alert">
					<button className="btn btn-sm btn-outline-success" onClick={this.compareList.bind(this)}>{compareState ? 'Cancel' : 'Compare'}</button>
					<button className="btn btn-sm btn-outline-success" onClick={this.clearList.bind(this)}>Clear list</button>
				</div>
			)
		}

		if(compareState) {
			dataSets = [...selected.values()]
		}

		return (
			<div>
				<h6 id="count-result"> - {filteredDataSets.length} results -</h6>
				<hr />
				<div className={this.props.showPanel ? "row" : ''}>
					<div className={this.props.showPanel ? "col-sm-3" : 'hidden'}>
						<FilterPanel />
					</div>
					<div className={ this.props.showPanel ? 'card-group col-sm-9' : 'card-group row'}>
				   {
				   		dataSets.map((dataSet, index) => {
				   			return (
				   				<div className="col-sm-4" key={index}>
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
									  <button className={ selected.has(dataSet.id) ? "btn btn-sm btn-success active" : "btn btn-sm btn-outline-success"} 
									  		  onClick={this.selected.bind(this, dataSet.id)}>{selected.has(dataSet.id) ? 'SELECTED' : 'COMPARE'}
									  </button>
									</div>
								</div>
				   			)
				   		})

				   }
				    </div>
				    
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
				{compareForm}
			</div>
		)
	}
}

export default DataTable