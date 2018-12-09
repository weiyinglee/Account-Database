/* eslint-disable */

//import dependienies
import React from 'react'
import config from '../config'
import { load } from '../helpers/spreadsheet'
import { Bar } from 'react-chartjs-2'

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
			if(filter.product != "" && !matchPrefix(filter.product, dataSet.product)) continue
			if(parseInt(dataSet.sensitivity) > filter.sensitivityMax) continue
			if(parseInt(dataSet.tat) > filter.tatMax) continue
			if(parseInt(dataSet.regulatory) > filter.regulatoryMax) continue
			if(parseInt(dataSet.score) > filter.scoreMax) continue

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
					return 0
					break
			}
		})

		//set max pages
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

	//filters
	setSensitivityMax(num) { this.props.setSensitivityMax(num) }
	setTATMax(num) { this.props.setTATMax(num) }
	setRegulatoryMax(num) { this.props.setRegulatoryMax(num) }
	setScoreMax(num) { this.props.setScoreMax(num) }


	render() {
		const { DataSets, filteredDataSets, pageNumber, maximumPage, filters, selected, compareState, error } = this.state

		const width = 300
		const height = 300

		let endEntry = pageNumber * this.numberOfShowPerPage
		let startEntry = endEntry - this.numberOfShowPerPage

		//handle error message page
		if(error) { return <div>{this.state.error}</div> }

		//JSX HTMLs
		let compareForm = ''
		let compareRank = ''
		let filterForm = ''
		let dataPresentations = ''
		let totalProduct = (<h6 id="count-result"><strong> Total Products: {filteredDataSets.length}</strong></h6>)
		let paginations = (
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
						<input type="number" id="page-input" min="1" max={maximumPage} placeholder="Enter page" onChange={this.handleChangePageNumber.bind(this)}/>
				    </li>
				  </ul>
			  </div>
			</nav>
		)
		
		//partial dataSets
		let dataSets = filteredDataSets.slice(startEntry, endEntry)

		//condition states
		if(selected.size != 0) {
			compareForm = (
				<div className="alert alert-secondary compare-alert" role="alert">
					<button className="btn btn-sm btn-outline-success compareBtn" onClick={this.compareList.bind(this)}>{compareState ? 'CANCEL' : 'COMPARE'}</button>
					<button className="btn btn-sm btn-outline-success" onClick={this.clearList.bind(this)}>CLEAR LIST</button>
				</div>
			)
		}

		if(compareState) {
			dataSets = [...selected.values()]

			const getMaxItemByType = (type, maxValue) => {
				return dataSets.find((data) => data[type] == maxValue).manufacturer
			}

			let maxSensitivity = Math.max(...dataSets.map(v => v.sensitivity), 0)
			let maxTAT = Math.max(...dataSets.map(v => v.tat), 0)
			let maxRegulatory = Math.max(...dataSets.map(v => v.regulatory), 0)
			let maxScore = Math.max(...dataSets.map(v => v.score), 0)

			compareRank = (
				<div className="card with-shadow border-secondary" id="compareRank">
				  <div className="card-body">
				  	<div className="card-title text-center"><h5><strong>BEST OF EACH CATEGORY</strong></h5></div>
				    <div className="card-text">
						<ul className="list-group list-group-flush">
							<li className="list-group-item">
								Sensitivity: <strong>{ getMaxItemByType('sensitivity', maxSensitivity) }</strong> <span className="badge badge-pill badge-secondary">{ maxSensitivity }</span>
							</li>
							<li className="list-group-item">
								TAT: <strong>{ getMaxItemByType('tat', maxTAT) }</strong> <span className="badge badge-pill badge-secondary">{ maxTAT }</span>
							</li>
							<li className="list-group-item">
								Regulatory: <strong>{ getMaxItemByType('regulatory', maxRegulatory) }</strong> <span className="badge badge-pill badge-secondary">{ maxRegulatory }</span>
							</li>
							<li className="list-group-item">
								Score: <strong>{ getMaxItemByType('score', maxScore) }</strong> <span className="badge badge-pill badge-secondary">{ maxScore }</span>
							</li>
						</ul>
				    </div>
				  </div>
				</div>
			)
			totalProduct = ''
			paginations = ''
		}

		if(dataSets.length == 0) {
			dataPresentations = (
				<div className="alert alert-danger no-result-alert" role="alert">
					Looks like there aren't any products that match your search :(
				</div>
			)
		}else {
			dataPresentations = dataSets.map((dataSet, index) => {
	   			let sensitivity = dataSet.sensitivity == '' ? 0 : parseInt(dataSet.sensitivity)
	   			let tat = dataSet.tat == '' ? 0 : parseInt(dataSet.tat)
	   			let regulatory = dataSet.regulatory == '' ? 0 : parseInt(dataSet.regulatory)
	   			let score = dataSet.score == '' ? 0 : parseInt(dataSet.score)

	   			return (
	   				<div 
	   					className={ 
	   						this.props.showPanel ? "col-sm-12 col-md-12 col-lg-6" : "col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4"
	   					} 
	   					key={index}>
						<div className="card d-flex with-shadow">
						  <div className="card-header">
						    <strong>{dataSet.manufacturer}</strong>
						  </div>
						  <div className="card-body flex-fill">
					        <Bar
					          data={
					          	{
						          	labels:['Sensitivity', 'TAT', 'Regulatory', 'Score'],
							        datasets:[
							          {
							            data:[
							              sensitivity,
							              tat,
							              regulatory,
							              score
							            ],
							            backgroundColor:[
							              'rgba(255, 99, 132, 0.6)',
							              'rgba(54, 162, 235, 0.6)',
							              'rgba(255, 206, 86, 0.6)',
							              'rgba(75, 192, 192, 0.6)',
							              'rgba(153, 102, 255, 0.6)',
							              'rgba(255, 159, 64, 0.6)',
							              'rgba(255, 99, 132, 0.6)'
							            ]
							          }
							        ]
					            }
					      	  }
					          options={{
					            title:{ 
					            	display: true,
					            	text: dataSet.product,
					            	fontSize: 18
					           	},
					            legend:{ display: false }
					          }}
					        />
						  </div>
						  <button className={ selected.has(dataSet.id) ? "btn btn-sm btn-success active" : "btn btn-sm btn-outline-success"} 
						  		  onClick={this.selected.bind(this, dataSet.id)}>{selected.has(dataSet.id) ? 'SELECTED' : 'COMPARE'}
						  </button>
						</div>
					</div>
	   			) })
		}

		//render the page
		return (
			<div className="data-section">
				{ totalProduct }
				<hr />
				<div className={this.props.showPanel ? "row" : ''}>

					<div className={this.props.showPanel ? "col-sm-3" : 'hidden'}>
						<FilterPanel 
							setSensitivityMax={this.setSensitivityMax.bind(this)}
							setTATMax={this.setTATMax.bind(this)}
							setRegulatoryMax={this.setRegulatoryMax.bind(this)}
							setScoreMax={this.setScoreMax.bind(this)}
							compareState={compareState}
						/>
					</div>

					<div className={ 
						this.props.showPanel ? 'card-group justify-content-md-center col-sm-9' : 'card-group justify-content-md-center row'
					}>
				    { dataPresentations }
				    </div>
				    <div className="container">
				    	{ compareRank }
				    </div>
			    </div>
			    <hr />
			    { paginations }
				{ compareForm }
			</div>
		)
	}
}

export default DataTable