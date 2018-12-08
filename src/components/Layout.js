//import dependencies
import React from 'react'

//import components
import DataFilters from './DataFilters'
import DataTable from './DataTable'

class Layout extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			filters: {
				manufacturer: "",
				sortBy: "",
				selected: new Map(),
				compareState: false
			}
		}
	}

	//handle the filtering types
	handleManufacturerFilter(prefix) {
		let filters = this.state.filters
		filters.manufacturer = prefix
		this.setState({ filters })
	}

	//handle the filters
	handleFilterBy(type) {
		let filters = this.state.filters
		filters.sortBy = type
		this.setState({ filters })
	}

	//compare selected list
	compareSelected() {
		let filters = this.state.filters
		filters.compareState = !filters.compareState
		this.setState({ filters })
	}

	//clear the compare
	clearSelected() {
		let filters = this.state.filters
		filters.selected.clear()
		filters.compareState = false
		this.setState({ filters })
	}

	//add the selected
	addSelected(index, data) {
		let filters = this.state.filters
		filters.selected.set(index, data)
		this.setState({ filters })
	}

	//remove the selected
	removeSelected(index) {
		let filters = this.state.filters
		filters.selected.delete(index)
		if(filters.selected.size === 0) filters.compareState = false
		this.setState({ filters })
	}


	render() {
		return (
			<div className="container-fluid">
				<DataFilters
					handleManufacturerFilter={this.handleManufacturerFilter.bind(this)}
					handleFilterBy={this.handleFilterBy.bind(this)}
					compareState={this.state.filters.compareState}
				/>
				<DataTable 
					filters={this.state.filters} 
					compareSelected={this.compareSelected.bind(this)}
					clearSelected={this.clearSelected.bind(this)}
					addSelected={this.addSelected.bind(this)}
					removeSelected={this.removeSelected.bind(this)}
				/>
			</div>
		)
	}
}

export default Layout