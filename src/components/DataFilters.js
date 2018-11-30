/* eslint-disable */

//import dependencies
import React from 'react'

class DataFilters extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			public_min: 0,
			public_max: 500,
			author_min: 0,
			author_max: 500
		}
	}

	resetTags() {
	   let boxes = document.getElementsByClassName("tagsCheckbox");
	   for(let i = 0; i < boxes.length; i++) {
	   	  this.props.handleTagsFilter(boxes[i].value, false)
	      boxes[i].checked = false;
	    } 
	}

	resetLocation() {
	   let boxes = document.getElementsByClassName("locationCheckbox");
	   for(let i = 0; i < boxes.length; i++) {
	   	  this.props.handleLocationFilter(boxes[i].value, false)
	      boxes[i].checked = false;
	    } 
	}

	resetPublic() {
		this.refs.publicMinForm.value = ""
		this.refs.publicMaxForm.value = ""
		this.props.handlePublicationFilter(0, 500)
	}

	resetAuthor() {
		this.refs.authorMinForm.value = ""
		this.refs.authorMaxForm.value = ""
		this.props.handleAuthorFilter(0, 500)
	}

	setPublicMin(e) { this.setState({ public_min: e.target.value }) }
	setPublicMax(e) { this.setState({ public_max: e.target.value }) }
	setAuthorMin(e) { this.setState({ author_min: e.target.value }) }
	setAuthorMax(e) { this.setState({ author_max: e.target.value }) }

	handleTypeFilter(type) {
		this.props.handleTypeFilter(type)
	}

	handlePublicationFilter() {
		this.props.handlePublicationFilter(this.state.public_min, this.state.public_max)
	}

	handleAuthorFilter() {
		this.props.handleAuthorFilter(this.state.author_min, this.state.author_max)
	}

	handleTagsFilter(e) {
		if(e.target.checked) {
			this.props.handleTagsFilter(e.target.value, true)
		} else {
			this.props.handleTagsFilter(e.target.value, false)
		}
	}

	handleLocationFilter(e) {
		if(e.target.checked) {
			this.props.handleLocationFilter(e.target.value, true)
		}else {
			this.props.handleLocationFilter(e.target.value, false)
		}
	}

	render() {
		return (
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
			  <span className="navbar-brand mb-0 h1">Account Database</span>
			  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
			    <span className="navbar-toggler-icon"></span>
			  </button>

			  <div className="collapse navbar-collapse" id="navbarSupportedContent">
			    <ul className="navbar-nav mr-auto">

			      <li className="nav-item dropdown">
			        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
			         Account Name
			        </a>
			        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
			        	<div className="input-group mb-3">
						  <input type="text" className="form-control" placeholder="Enter Names"/>
						  <div className="input-group-append">
						    <button className="btn btn-outline-secondary btn-sm">Search</button>
						  </div>
						</div>					        	
			        </div>
			      </li>

				  <li className="nav-item dropdown">
			        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
			          Account Type
			        </a>
			        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
			          <a className="dropdown-item" href="#" onClick={this.handleTypeFilter.bind(this, null)}>All</a>
			          <div className="dropdown-divider"></div>
			          <a className="dropdown-item" href="#" onClick={this.handleTypeFilter.bind(this,'Academia')}>Academia</a>
			          <a className="dropdown-item" href="#" onClick={this.handleTypeFilter.bind(this,'Other')}>Other</a>
			        </div>
			      </li>

			      <li className="nav-item dropdown">
			        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
			          Location
			        </a>
			        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
			          <a className="dropdown-item" href="#" onClick={this.resetLocation.bind(this)}>All</a>
					  <div className="dropdown-divider"></div>
					  <form>
					  <a className="dropdown-item" href="#"><input type="checkbox" className="locationCheckbox" value="Australia" onChange={this.handleLocationFilter.bind(this)}/>&nbsp;Australia</a>
					  <div className="dropdown-divider"></div>
					  <a className="dropdown-item" href="#"><input type="checkbox" className="locationCheckbox" value="Belgium" onChange={this.handleLocationFilter.bind(this)}/>&nbsp;Belgium</a>
					  <a className="dropdown-item" href="#"><input type="checkbox" className="locationCheckbox" value="Brazil" onChange={this.handleLocationFilter.bind(this)}/>&nbsp;Brazil</a>
					  <div className="dropdown-divider"></div>
			          <a className="dropdown-item" href="#"><input type="checkbox" className="locationCheckbox" value="Canada" onChange={this.handleLocationFilter.bind(this)}/>&nbsp;Canada</a>
			          <a className="dropdown-item" href="#"><input type="checkbox" className="locationCheckbox" value="China" onChange={this.handleLocationFilter.bind(this)}/>&nbsp;China</a>
			          <a className="dropdown-item" href="#"><input type="checkbox" className="locationCheckbox" value="Chile" onChange={this.handleLocationFilter.bind(this)}/>&nbsp;Chile</a>
			          <div className="dropdown-divider"></div>
			          <a className="dropdown-item" href="#"><input type="checkbox" className="locationCheckbox" value="Denmark" onChange={this.handleLocationFilter.bind(this)}/>&nbsp;Denmark</a>
			          <div className="dropdown-divider"></div>
			          <a className="dropdown-item" href="#"><input type="checkbox" className="locationCheckbox" value="Finland" onChange={this.handleLocationFilter.bind(this)}/>&nbsp;Finland</a>
			          <a className="dropdown-item" href="#"><input type="checkbox" className="locationCheckbox" value="France" onChange={this.handleLocationFilter.bind(this)}/>&nbsp;France</a>
			          <div className="dropdown-divider"></div>
			          <a className="dropdown-item" href="#"><input type="checkbox" className="locationCheckbox" value="Germany" onChange={this.handleLocationFilter.bind(this)}/>&nbsp;Germany</a>
			          <div className="dropdown-divider"></div>
			          <a className="dropdown-item" href="#"><input type="checkbox" className="locationCheckbox" value="Hong Kong" onChange={this.handleLocationFilter.bind(this)}/>&nbsp;Hong Kong</a>
			          <a className="dropdown-item" href="#"><input type="checkbox" className="locationCheckbox" value="Hungary" onChange={this.handleLocationFilter.bind(this)}/>&nbsp;Hungary</a>
			          <div className="dropdown-divider"></div>
			          <a className="dropdown-item" href="#"><input type="checkbox" className="locationCheckbox" value="Israel" onChange={this.handleLocationFilter.bind(this)}/>&nbsp;Israel</a>
			          <a className="dropdown-item" href="#"><input type="checkbox" className="locationCheckbox" value="India" onChange={this.handleLocationFilter.bind(this)}/>&nbsp;India</a>
			          <a className="dropdown-item" href="#"><input type="checkbox" className="locationCheckbox" value="Ireland" onChange={this.handleLocationFilter.bind(this)}/>&nbsp;Ireland</a>
			          <a className="dropdown-item" href="#"><input type="checkbox" className="locationCheckbox" value="Italy" onChange={this.handleLocationFilter.bind(this)}/>&nbsp;Italy</a>
			          <div className="dropdown-divider"></div>
			          <a className="dropdown-item" href="#"><input type="checkbox" className="locationCheckbox" value="Japan" onChange={this.handleLocationFilter.bind(this)}/>&nbsp;Japan</a>
			          <div className="dropdown-divider"></div>
			          <a className="dropdown-item" href="#"><input type="checkbox" className="locationCheckbox" value="Lithuania" onChange={this.handleLocationFilter.bind(this)}/>&nbsp;Lithuania</a>
			          <div className="dropdown-divider"></div>
					  <a className="dropdown-item" href="#"><input type="checkbox" className="locationCheckbox" value="Netherlands" onChange={this.handleLocationFilter.bind(this)}/>&nbsp;Netherlands</a>
			          <a className="dropdown-item" href="#"><input type="checkbox" className="locationCheckbox" value="New Zealand" onChange={this.handleLocationFilter.bind(this)}/>&nbsp;New Zealand</a>
			          <div className="dropdown-divider"></div>
			          <a className="dropdown-item" href="#"><input type="checkbox" className="locationCheckbox" value="Russia" onChange={this.handleLocationFilter.bind(this)}/>&nbsp;Russia</a>
			          <div className="dropdown-divider"></div>
			          <a className="dropdown-item" href="#"><input type="checkbox" className="locationCheckbox" value="Saudi Arabia" onChange={this.handleLocationFilter.bind(this)}/>&nbsp;Saudi Arabia</a>
			          <a className="dropdown-item" href="#"><input type="checkbox" className="locationCheckbox" value="Singapore" onChange={this.handleLocationFilter.bind(this)}/>&nbsp;Singapore</a>
			          <a className="dropdown-item" href="#"><input type="checkbox" className="locationCheckbox" value="Slovenia" onChange={this.handleLocationFilter.bind(this)}/>&nbsp;Slovenia</a>
			          <a className="dropdown-item" href="#"><input type="checkbox" className="locationCheckbox" value="South Korea" onChange={this.handleLocationFilter.bind(this)}/>&nbsp;South Korea</a>
			          <a className="dropdown-item" href="#"><input type="checkbox" className="locationCheckbox" value="Spain" onChange={this.handleLocationFilter.bind(this)}/>&nbsp;Spain</a>
			          <a className="dropdown-item" href="#"><input type="checkbox" className="locationCheckbox" value="Switzerland" onChange={this.handleLocationFilter.bind(this)}/>&nbsp;Switzerland</a>
			          <a className="dropdown-item" href="#"><input type="checkbox" className="locationCheckbox" value="Sweden" onChange={this.handleLocationFilter.bind(this)}/>&nbsp;Sweden</a>
			          <div className="dropdown-divider"></div>
			          <a className="dropdown-item" href="#"><input type="checkbox" className="locationCheckbox" value="Taiwan" onChange={this.handleLocationFilter.bind(this)}/>&nbsp;Taiwan</a>
			          <div className="dropdown-divider"></div>
			          <a className="dropdown-item" href="#"><input type="checkbox" className="locationCheckbox" value="United Kingdom" onChange={this.handleLocationFilter.bind(this)}/>&nbsp;United Kingdom</a>
			          <a className="dropdown-item" href="#"><input type="checkbox" className="locationCheckbox" value="United States" onChange={this.handleLocationFilter.bind(this)}/>&nbsp;United States</a>
			          </form>
			        </div>
			      </li>		

			      <li className="nav-item dropdown">
			        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
			          Publication Volume Range
			        </a>
			        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
			          <input type="number" min="0" max="500" className="form-control" placeholder="From..." onChange={this.setPublicMin.bind(this)} ref="publicMinForm"/>
			          <div className="dropdown-divider"></div>
				      <input type="number" min="0" max="500" className="form-control mr-sm-2" placeholder="To..." onChange={this.setPublicMax.bind(this)} ref="publicMaxForm"/>
			          <div className="dropdown-divider"></div>
			          <a href="#" className="dropdown-item" onClick={this.handlePublicationFilter.bind(this)}>Search</a>
			          <div className="dropdown-divider"></div>
			          <a href="#" className="dropdown-item" onClick={this.resetPublic.bind(this)}>Reset</a>
			        </div>
			      </li>

			      <li className="nav-item dropdown">
			        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
			          Author Volume Range
			        </a>
			        <div className="dropdown-menu" aria-labelledby="navbarDropdown"> 
			          <input type="number" min="0" max="500" className="form-control" placeholder="From..." onChange={this.setAuthorMin.bind(this)} ref="authorMinForm"/>
			          <div className="dropdown-divider"></div>
				      <input type="number" min="0" max="500" className="form-control mr-sm-2" placeholder="To..." onChange={this.setAuthorMax.bind(this)} ref="authorMaxForm"/>
			          <div className="dropdown-divider"></div>
			          <a href="#" className="dropdown-item" onClick={this.handleAuthorFilter.bind(this)}>Search</a>
			          <div className="dropdown-divider"></div>
			          <a href="#" className="dropdown-item" onClick={this.resetAuthor.bind(this)}>Reset</a>		         
			        </div>
			      </li>

			      <li className="nav-item dropdown">
			        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
			          Tags
			        </a>
			        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
			          <a className="dropdown-item" href="#" onClick={this.resetTags.bind(this)}>Reset</a>
			          <div className="dropdown-divider"></div>
			          <form>
			          <a href="#" className="dropdown-item"><input type="checkbox" className="tagsCheckbox" value="CRISPR" onChange={this.handleTagsFilter.bind(this)}/>&nbsp;CRISPR</a>
			          <a href="#" className="dropdown-item"><input type="checkbox" className="tagsCheckbox" value="Diagnostics" onChange={this.handleTagsFilter.bind(this)}/>&nbsp;Diagnostics</a>
			          <a href="#" className="dropdown-item"><input type="checkbox" className="tagsCheckbox" value="Mol-Bio" onChange={this.handleTagsFilter.bind(this)}/>&nbsp;Mol-Bio</a>
			          <a href="#" className="dropdown-item"><input type="checkbox" className="tagsCheckbox" value="Genetics" onChange={this.handleTagsFilter.bind(this)}/>&nbsp;Genetics</a>
			          <a href="#" className="dropdown-item"><input type="checkbox" className="tagsCheckbox" value="Clinical" onChange={this.handleTagsFilter.bind(this)}/>&nbsp;Clinical</a>
			          <a href="#" className="dropdown-item"><input type="checkbox" className="tagsCheckbox" value="Hospital" onChange={this.handleTagsFilter.bind(this)}/>&nbsp;Hospital</a>
			          </form>      	
			        </div>
			      </li>
			    </ul>
			  </div>
			</nav>
		)
	}
}

export default DataFilters