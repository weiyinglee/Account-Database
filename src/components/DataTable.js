/* eslint-disable */

//import dependienies
import React from 'react'
import { Bar } from 'react-chartjs-2'

//import components
import FilterPanel from './FilterPanel'
import Pagination from './Pagination'
import LoadingSpinner from './LoadingSpinner'

class DataTable extends React.Component {
	constructor(props) {
		super(props)
		this.numberOfShowPerPage = props.numberOfShowPerPage
		this.state = {
			DataSets: [],
			filteredDataSets: [],
			pageNumber: props.pageNumber,
			maximumPage: props.maximumPage,
			selected: new Map(),
			compareState: false,
			error: null
		}
	}

	//update the data after the filter updated
	componentWillReceiveProps(nextProps) {
		let filter = nextProps.filters

		this.setState({
			DataSets: nextProps.DataSets,
			filteredDataSets: nextProps.filteredDataSets,
			pageNumber: nextProps.pageNumber,
			maximumPage: nextProps.maximumPage,
			selected: filter.selected,
			compareState: filter.compareState
		})
	}

	//put the selected items to the comparing list
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

	//clear all the selected items from the comparing list
	clearList() {
		let { filteredDataSets, DataSets} = this.state
		filteredDataSets = DataSets
		this.setState({ filteredDataSets })
		this.props.clearSelected()
	}

	//Compare all the items in the comparing list
	compareList() {
		this.props.compareSelected()
	}

	//pass each category value to the App for filtering
	setSensitivityMax(num) { this.props.setSensitivityMax(num) }
	setTATMax(num) { this.props.setTATMax(num) }
	setRegulatoryMax(num) { this.props.setRegulatoryMax(num) }
	setScoreMax(num) { this.props.setScoreMax(num) }

	//render the page
	render() {
		//grab all the properties from the state
		const { filteredDataSets, pageNumber, maximumPage, filters, selected, compareState, error } = this.state

		//Calculate the range for the partial data set per page
		let endEntry = pageNumber * this.numberOfShowPerPage
		let startEntry = endEntry - this.numberOfShowPerPage

		//JSX HTMLs
		let compareForm = ''
		let compareRank = ''
		let filterForm = ''
		let dataPresentations = ''
		let totalProduct = (<h6 id="count-result"><strong> Total Products: {filteredDataSets.length}</strong></h6>)
		
		//partial dataSets
		let dataSets = filteredDataSets.slice(startEntry, endEntry)		

		//If the comparing list is empty, hide the compare alert form
		if(selected.size != 0) {
			compareForm = (
				<div className="alert alert-secondary compare-alert" role="alert">
					<button className="btn btn-sm btn-outline-success compareBtn" onClick={this.compareList.bind(this)}>{compareState ? 'CANCEL' : 'COMPARE'}</button>
					<button className="btn btn-sm btn-outline-success" onClick={this.clearList.bind(this)}>CLEAR LIST</button>
				</div>
			)
		}

		//If the state of the application is currently comparing items, the app render the items in comparing list instead
		//render all other essential elements for the comparing page
		if(compareState) {
			//get the comparing list
			dataSets = [...selected.values()]

			//calculate all the max values for each category
			let maxSensitivity = Math.max(...dataSets.map(v => v.sensitivity), 0)
			let maxTAT = Math.max(...dataSets.map(v => v.tat), 0)
			let maxRegulatory = Math.max(...dataSets.map(v => v.regulatory), 0)
			let maxScore = Math.max(...dataSets.map(v => v.score), 0)			

			//get the item with the max value for specific category
			const getMaxItemByType = (category, maxValue) => {
				return dataSets.find((data) => data[category] == maxValue).manufacturer
			}

			//create the ranking HTML
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
		}

		//if the dataSets is empty, show the alert telling user there is no result found
		if(dataSets.length == 0) {
			//display no result alert
			dataPresentations = (
				<div className="alert alert-danger no-result-alert" role="alert">
					Looks like there aren't any products that match your search :(
				</div>
			)
		}else {
			//display the presentation for all the data
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
		//handle error message page
		if(error) { return <div>{this.state.error}</div> }

		//if the data is still loading, show the progressive spinner
		if(this.props.onLoad) {
			return (
				<div className="spinner">
					<LoadingSpinner />
				</div>
			)
		}else {
			//show normal UI
			return (
				<div className="data-section">
					{ totalProduct }
					<hr />
					<div className={this.props.showPanel ? "row" : ''}>

						<div className={this.props.showPanel ? "col-sm-3" : 'hidden'}>
							<FilterPanel
								sensitivity={this.props.filters.sensitivityMax}
								tat={this.props.filters.tatMax}
								regulatory={this.props.filters.regulatoryMax}
								score={this.props.filters.scoreMax}
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
					{ compareForm }
				</div>
			)			
		}
	}
}

export default DataTable