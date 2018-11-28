import React from 'react'

class DataFilters extends React.Component {
	render() {
		return (
			<div>
				<nav className="navbar navbar-expand-lg navbar-light bg-light">
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
				          <a className="dropdown-item" href="#">All</a>
				          <div className="dropdown-divider"></div>
				          <a className="dropdown-item" href="#">Academia</a>
				          <a className="dropdown-item" href="#">Other</a>
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
				          <a href="#" className="dropdown-item">All</a>
				          <div className="dropdown-divider"></div>
				          <input type="number" min="0" max="500" className="form-control" placeholder="From..."/>
				          <div className="dropdown-divider"></div>
					      <input type="number" min="0" max="500" className="form-control mr-sm-2" placeholder="To..."/>
				        </div>
				      </li>

				      <li className="nav-item dropdown">
				        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
				          Author Volume Range
				        </a>
				        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
				          <a href="#" className="dropdown-item">All</a>
				          <div className="dropdown-divider"></div>
				          <input type="number" min="0" max="500" className="form-control" placeholder="From..."/>
				          <div className="dropdown-divider"></div>
					      <input type="number" min="0" max="500" className="form-control mr-sm-2" placeholder="To..."/>
				        </div>
				      </li>

				      <li className="nav-item dropdown">
				        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
				          Tags
				        </a>
				        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
				          <a className="dropdown-item" href="#">All</a>
				          <div className="dropdown-divider"></div>
				          <form>
				          <a href="#" className="dropdown-item"><input type="checkbox"/>&nbsp;CRISPR</a>
				          <a href="#" className="dropdown-item"><input type="checkbox"/>&nbsp;Diagnostics</a>
				          <a href="#" className="dropdown-item"><input type="checkbox"/>&nbsp;Mol-Bio</a>
				          <a href="#" className="dropdown-item"><input type="checkbox"/>&nbsp;Genetics</a>
				          <a href="#" className="dropdown-item"><input type="checkbox"/>&nbsp;Clinical</a>
				          <a href="#" className="dropdown-item"><input type="checkbox"/>&nbsp;Hospital</a>
				          </form>      	
				        </div>
				      </li>
				    </ul>
				  </div>
				</nav>
			</div>
		)
	}
}

export default DataFilters