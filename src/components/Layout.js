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
				manufacturer: ""
			}
		}
	}

	//handle the filtering types
	handleManufacturerFilter(prefix) {
		let filters = this.state.filters
		filters.manufacturer = prefix
		this.setState({ filters })
	}

	render() {
		return (
			<div className="container-fluid">
				<DataFilters
					handleManufacturerFilter={this.handleManufacturerFilter.bind(this)} 
				/>
				<DataTable filters={this.state.filters} />
			</div>
		)
	}
}

export default Layout