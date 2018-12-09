//import dependencies
import React from 'react'

//import components
import DataFilters from './DataFilters'
import DataTable from './DataTable'
import Header from './Header'
import Footer from './Footer'

class Layout extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			filters: {
				manufacturer: "",
				sensitivityMax: 5,
				tatMax: 5,
				regulatoryMax: 5,
				scoreMax: 15,
				sortBy: "",
				selected: new Map(),
				compareState: false
			},
			showPanel: false
		}
	}

	//handle the filtering types
	handleManufacturerFilter(prefix) {
		let { filters } = this.state
		filters.manufacturer = prefix
		this.setState({ filters })
	}

	//handle the filters
	handleFilterBy(type) {
		let { filters } = this.state
		filters.sortBy = type
		this.setState({ filters })
	}

	//compare selected list
	compareSelected() {
		let { filters } = this.state

		filters.manufacturer = ""
		filters.sortBy = ""
		filters.compareState = !filters.compareState

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
	}

	setTATMax(num) {
		let { filters } = this.state
		filters.tatMax = num
		this.setState({ filters })
	}


	setRegulatoryMax(num) {
		let { filters } = this.state
		filters.regulatoryMax = num
		this.setState({ filters })
	}


	setScoreMax(num) {
		let { filters } = this.state
		filters.scoreMax = num
		this.setState({ filters })
	}


	render() {
		return (
			<div className="container-fluid bg-light">
				<Header />
				<DataFilters
					handleManufacturerFilter={this.handleManufacturerFilter.bind(this)}
					handleFilterBy={this.handleFilterBy.bind(this)}
					compareState={this.state.filters.compareState}
					openFilterPanel={this.openFilterPanel.bind(this)}
					showPanel={this.state.showPanel}
				/>
				<DataTable 
					filters={this.state.filters} 
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
				<Footer />
			</div>
		)
	}
}

export default Layout