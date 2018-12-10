/* eslint-disable */

//import dependencies
import React from 'react'
import { load } from '../helpers/spreadsheet'
import config from '../config'

//import components
import DataFilters from './DataFilters'
import DataTable from './DataTable'
import Header from './Header'
import Footer from './Footer'
import Pagination from './Pagination'

class Layout extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			DataSets: [],
			filteredDataSets: [],
			filters: {
				manufacturer: "",
				product: "",
				sensitivityMax: 5,
				tatMax: 5,
				regulatoryMax: 5,
				scoreMax: 15,
				sortBy: "",
				selected: new Map(),
				compareState: false
			},
			showPanel: false,
			pageNumber: 1,
			maximumPage: 1
		},
		this.numberOfShowPerPage = 15
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

				//set max pages
				let maximumPage = Math.ceil(filteredDataSets.length / this.numberOfShowPerPage)
				if(maximumPage <= 0) maximumPage = 1

				let pageNumber = this.state.pageNumber
				if(pageNumber > maximumPage) pageNumber = maximumPage

				this.setState({ DataSets, filteredDataSets, maximumPage, pageNumber })

			  } else {
			    this.setState({ error });
			  }
			})
		  })
		})		
	}

	setUpFilter(filter) {
		let { DataSets } = this.state
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

		this.setState({ filteredDataSets })
	}

	//handle the filtering for manufacturer
	handleManufacturerFilter(prefix) {
		let { filters } = this.state
		filters.manufacturer = prefix
		this.setState({ filters })
		this.setUpFilter(filters)
	}

	//handle the filtering for product
	handleProductFilter(prefix) {
		let { filters } = this.state
		filters.product = prefix
		this.setState({ filters })
		this.setUpFilter(filters)
	}

	//handle the filters
	handleFilterBy(type) {
		let { filters } = this.state
		filters.sortBy = type
		this.setState({ filters })
		this.setUpFilter(filters)
	}

	//compare selected list
	compareSelected() {
		let { filters } = this.state

		//filter reset
		filters.manufacturer = ""
		filters.product = ""
		filters.sortBy = ""
		filters.sensitivityMax = 5
		filters.tatMax = 5
		filters.regulatoryMax = 5
		filters.scoreMax = 15
		filters.compareState = !filters.compareState

		//filter data reset
		this.setUpFilter(filters)

		this.setState({ filters, showPanel: false })
	}

	//clear the compare
	clearSelected() {
		let { filters } = this.state
		filters.selected.clear()
		filters.compareState = false

		this.setState({ filters })
	}

	//add the selected
	addSelected(index, data) {
		let { filters } = this.state
		filters.selected.set(index, data)
		this.setState({ filters })
	}

	//remove the selected
	removeSelected(index) {
		let { filters } = this.state
		filters.selected.delete(index)
		if(filters.selected.size === 0) filters.compareState = false
		this.setState({ filters })
	}

	//open filter panel
	openFilterPanel() {
		this.setState({ showPanel: !this.state.showPanel })
	}

	//set filters value
	setSensitivityMax(num) {
		let { filters } = this.state
		filters.sensitivityMax = num
		this.setState({ filters })
		this.setUpFilter(filters)
	}

	setTATMax(num) {
		let { filters } = this.state
		filters.tatMax = num
		this.setState({ filters })
		this.setUpFilter(filters)
	}


	setRegulatoryMax(num) {
		let { filters } = this.state
		filters.regulatoryMax = num
		this.setState({ filters })
		this.setUpFilter(filters)
	}


	setScoreMax(num) {
		let { filters } = this.state
		filters.scoreMax = num
		this.setState({ filters })
		this.setUpFilter(filters)
	}

	//handle the increment/decrement of page
	changePageNumber(isIncrement) {
		let pageNumber = parseInt(this.state.pageNumber)
		let maximumPage = this.state.maximumPage

		if(isIncrement) pageNumber++
		else pageNumber--

		//prevent page out of bound
		if(pageNumber <= 0) pageNumber = 1
		else if(pageNumber > maximumPage) pageNumber = maximumPage

		//update the page number
		this.setState({ pageNumber })
	}

	//handle the input onchange for page
	handleChangePageNumber(e) {
		let pageNumber = e.target.value
		let maximumPage = this.state.maximumPage

		//prevent page out of bound
		if(pageNumber > maximumPage) pageNumber = maximumPage
		else if(pageNumber <= 0 || pageNumber == '') pageNumber = 1

		//update the page number
		this.setState({ pageNumber })
	}

	render() {

		let pageHTML = (
			<Pagination 
				changePageNumber={this.changePageNumber.bind(this)}
				handleChangePageNumber={this.handleChangePageNumber.bind(this)}
				pageNumber={this.state.pageNumber}
				maximumPage={this.state.maximumPage}
			/>
		)

		if(this.state.filters.compareState) { pageHTML = '' }

		return (
			<div className="container-fluid bg-light">
				<Header />
				<DataFilters
					handleManufacturerFilter={this.handleManufacturerFilter.bind(this)}
					handleProductFilter={this.handleProductFilter.bind(this)}
					handleFilterBy={this.handleFilterBy.bind(this)}
					compareState={this.state.filters.compareState}
					openFilterPanel={this.openFilterPanel.bind(this)}
					showPanel={this.state.showPanel}
				/>
				<DataTable
					DataSets={this.state.DataSets}
					filteredDataSets={this.state.filteredDataSets}
					filters={this.state.filters}
					pageNumber={this.state.pageNumber}
					maximumPage={this.state.maximumPage}
					numberOfShowPerPage={this.numberOfShowPerPage}
					compareSelected={this.compareSelected.bind(this)}
					clearSelected={this.clearSelected.bind(this)}
					addSelected={this.addSelected.bind(this)}
					removeSelected={this.removeSelected.bind(this)}
					showPanel={this.state.showPanel}
					setSensitivityMax={this.setSensitivityMax.bind(this)}
					setTATMax={this.setTATMax.bind(this)}
					setRegulatoryMax={this.setRegulatoryMax.bind(this)}
					setScoreMax={this.setScoreMax.bind(this)}
				/>
				{ pageHTML }
				<Footer />
			</div>
		)
	}
}

export default Layout