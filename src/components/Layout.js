//import dependencies
import React from 'react'

//import components
import DataFilters from './DataFilters'
import DataTable from './DataTable'

class Layout extends React.Component {
	render() {
		return (
			<div className="container">
				<h1 id="app-title">Account Database</h1>
				<DataFilters />
				<DataTable />
			</div>
		)
	}
}

export default Layout