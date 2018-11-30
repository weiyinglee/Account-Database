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
				name: null,
				type: null,
				country: [],
				public: [0, 500],
				author: [0, 500],
				tags: []
			}
		}
	}

	//handle the filtering types
	handleNameFilter() {

	}

	handleTypeFilter(type) {
		let filters = this.state.filters
		filters.type = type
		this.setState({ filters })
	}

	handleLocationFilter(item, isAdd) {
		let filters = this.state.filters
		if(isAdd) filters.country.push(item)
		else filters.country.splice(filters.country.indexOf(item), 1)	
		this.setState({ filters })		
	}

	handlePublicationFilter(min, max) {
		let filters = this.state.filters
		filters.public = [parseInt(min), parseInt(max)]
		this.setState({ filters })
	}

	handleAuthorFilter(min, max) {
		let filters = this.state.filters
		filters.author = [parseInt(min), parseInt(max)]
		this.setState({ filters })
	}

	handleTagsFilter(item, isAdd) {
		let filters = this.state.filters
		if(isAdd) filters.tags.push(item)
		else filters.tags.splice(filters.tags.indexOf(item), 1)	
		this.setState({ filters })
	}

	render() {
		return (
			<div className="container">
				<DataFilters
					handleNameFilter={this.handleNameFilter.bind(this)} 
					handleTypeFilter={this.handleTypeFilter.bind(this)}
					handleLocationFilter={this.handleLocationFilter.bind(this)}
					handlePublicationFilter={this.handlePublicationFilter.bind(this)}
					handleAuthorFilter={this.handleAuthorFilter.bind(this)}
					handleTagsFilter={this.handleTagsFilter.bind(this)}
				/>
				<DataTable filters={this.state.filters} />
			</div>
		)
	}
}

export default Layout