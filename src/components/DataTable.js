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

	//update the data after the filter
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
		const { filteredDataSets, pageNumber, maximumPage, filters, selected, compareState, error } = this.state

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
		if(this.props.onLoad) {
			return (
				<div className="spinner">
					<LoadingSpinner />
				</div>
			)
		}else {
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