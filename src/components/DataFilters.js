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
			          <a className="dropdown-item" href="#">All</a>
					  <div className="dropdown-divider"></div>
					  <form>
					  <a className="dropdown-item" href="#"><input type="checkbox"/>&nbsp;Australia</a>
					  <div className="dropdown-divider"></div>
					  <a className="dropdown-item" href="#"><input type="checkbox"/>&nbsp;Belgium</a>
					  <div className="dropdown-divider"></div>
			          <a className="dropdown-item" href="#"><input type="checkbox"/>&nbsp;Canada</a>
			          <a className="dropdown-item" href="#"><input type="checkbox"/>&nbsp;China</a>
			          <a className="dropdown-item" href="#"><input type="checkbox"/>&nbsp;Denmark</a>
			          <div className="dropdown-divider"></div>
			          <a className="dropdown-item" href="#"><input type="checkbox"/>&nbsp;France</a>
			          <div className="dropdown-divider"></div>
			          <a className="dropdown-item" href="#"><input type="checkbox"/>&nbsp;Germany</a>
			          <div className="dropdown-divider"></div>
			          <a className="dropdown-item" href="#"><input type="checkbox"/>&nbsp;Hong Kong</a>
			          <a className="dropdown-item" href="#"><input type="checkbox"/>&nbsp;Hungary</a>
			          <div className="dropdown-divider"></div>
			          <a className="dropdown-item" href="#"><input type="checkbox"/>&nbsp;Israel</a>
			          <a className="dropdown-item" href="#"><input type="checkbox"/>&nbsp;India</a>
			          <a className="dropdown-item" href="#"><input type="checkbox"/>&nbsp;Ireland</a>
			          <a className="dropdown-item" href="#"><input type="checkbox"/>&nbsp;Italy</a>
			          <div className="dropdown-divider"></div>
			          <a className="dropdown-item" href="#"><input type="checkbox"/>&nbsp;Japan</a>
			          <div className="dropdown-divider"></div>
			          <a className="dropdown-item" href="#"><input type="checkbox"/>&nbsp;Lithuania</a>
			          <div className="dropdown-divider"></div>
					  <a className="dropdown-item" href="#"><input type="checkbox"/>&nbsp;Netherland</a>
			          <a className="dropdown-item" href="#"><input type="checkbox"/>&nbsp;New Zealand</a>
			          <div className="dropdown-divider"></div>
			          <a className="dropdown-item" href="#"><input type="checkbox"/>&nbsp;Russia</a>
			          <div className="dropdown-divider"></div>
			          <a className="dropdown-item" href="#"><input type="checkbox"/>&nbsp;Saudi Arabia</a>
			          <a className="dropdown-item" href="#"><input type="checkbox"/>&nbsp;Singapore</a>
			          <a className="dropdown-item" href="#"><input type="checkbox"/>&nbsp;Slovenia</a>
			          <a className="dropdown-item" href="#"><input type="checkbox"/>&nbsp;South Korea</a>
			          <a className="dropdown-item" href="#"><input type="checkbox"/>&nbsp;Spain</a>
			          <a className="dropdown-item" href="#"><input type="checkbox"/>&nbsp;Switzerland</a>
			          <a className="dropdown-item" href="#"><input type="checkbox"/>&nbsp;Sweden</a>
			          <div className="dropdown-divider"></div>
			          <a className="dropdown-item" href="#"><input type="checkbox"/>&nbsp;Taiwan</a>
			          <div className="dropdown-divider"></div>
			          <a className="dropdown-item" href="#"><input type="checkbox"/>&nbsp;United Kingdom</a>
			          <a className="dropdown-item" href="#"><input type="checkbox"/>&nbsp;United States</a>
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