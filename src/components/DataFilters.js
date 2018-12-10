/* eslint-disable */

//import dependencies
import React from 'react'

class DataFilters extends React.Component {

	constructor(props) {
		super(props)
	}

	//event handler for input filters
	handleManufacturerFilter(e) {
		this.props.handleManufacturerFilter(e.target.value)
	}

	handleProductFilter(e) {
		this.props.handleProductFilter(e.target.value)
	}

	//handle the filters
	handleFilterBy(e) {
		this.props.handleFilterBy(e.target.value)
	}

	//open filter panel
	openFilterPanel() {
		this.props.openFilterPanel()
	}


	render() {
		if(this.props.compareState) {
			return (<div></div>)
		}
		return (
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
			  <div className="row" id="navbarSupportedContent">

		        <form className="navbar-nav form-inline col-12 col-sm-12 col-md-4 col-lg-4">
				    <div className="input-group">
				        <div className="input-group-prepend with-shadow-light">
				          <span className="input-group-text bg-light"><strong>Company</strong></span>
				        </div>
				      <input className="form-control with-shadow-light" type="search" onChange={this.handleManufacturerFilter.bind(this)} ref="nameInput" placeholder="Search name..." aria-label="Search" />
				    </div>
				</form>

		        <form className="navbar-nav form-inline col-12 col-sm-12 col-md-4 col-lg-4">
				    <div className="input-group">
				        <div className="input-group-prepend with-shadow-light">
				          <span className="input-group-text bg-light"><strong>Product</strong></span>
				        </div>
				      <input className="form-control with-shadow-light" type="search" onChange={this.handleProductFilter.bind(this)} ref="productInput" placeholder="Search product..." aria-label="Search" />
				    </div>
				</form>			    

		        <div className="navbar-nav form-inline form-group col-6 col-sm-6 col-md-2 col-lg-3">
				    <div className="input-group">
				        <div className="input-group-prepend with-shadow-light">
				          <span className="input-group-text bg-light"><strong>Sort By</strong></span>
				        </div>
					    <select className="form-control with-shadow-light" onChange={this.handleFilterBy.bind(this)}>
					      <option>None</option>
						  <option>Name</option>
						  <option>Sensitivity</option>
						  <option>TAT</option>
						  <option>Regulatory</option>
						  <option>Score</option>
						</select>				        
				    </div>		        	
				</div>

			    <ul className="navbar-nav col-6 col-sm-6 col-md-2 col-lg-1">
			    	<li className="nav-item">
        				<a className="btn btn-outline-info with-shadow-light" href="#" id="filterPanelBtn" onClick={this.openFilterPanel.bind(this)}>
        					{this.props.showPanel ? 'CLOSE FILTERS' : 'OPEN FILTERS'}
        				</a>
          			</li>
			    </ul>
			  </div>
			</nav>
		)
	}
}

export default DataFilters