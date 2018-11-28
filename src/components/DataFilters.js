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
				          Account Type
				        </a>
				        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
				          <a className="dropdown-item" href="#">Academia</a>
				          <a className="dropdown-item" href="#">Other</a>
				        </div>
				      </li>

				      <li className="nav-item dropdown">
				        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
				          Location
				        </a>
				        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
						  <a className="dropdown-item" href="#">Australia</a>
						  <div class="dropdown-divider"></div>
						  <a className="dropdown-item" href="#">Belgium</a>
						  <div class="dropdown-divider"></div>
				          <a className="dropdown-item" href="#">Canada</a>
				          <a className="dropdown-item" href="#">China</a>
				          <a className="dropdown-item" href="#">Denmark</a>
				          <div class="dropdown-divider"></div>
				          <a className="dropdown-item" href="#">France</a>
				          <div class="dropdown-divider"></div>
				          <a className="dropdown-item" href="#">Germany</a>
				          <div class="dropdown-divider"></div>
				          <a className="dropdown-item" href="#">Hong Kong</a>
				          <a className="dropdown-item" href="#">Hungary</a>
				          <div class="dropdown-divider"></div>
				          <a className="dropdown-item" href="#">Israel</a>
				          <a className="dropdown-item" href="#">India</a>
				          <a className="dropdown-item" href="#">Ireland</a>
				          <a className="dropdown-item" href="#">Italy</a>
				          <div class="dropdown-divider"></div>
				          <a className="dropdown-item" href="#">Japan</a>
				          <div class="dropdown-divider"></div>
				          <a className="dropdown-item" href="#">Lithuania</a>
				          <div class="dropdown-divider"></div>
						  <a className="dropdown-item" href="#">Netherland</a>
				          <a className="dropdown-item" href="#">New Zealand</a>
				          <div class="dropdown-divider"></div>
				          <a className="dropdown-item" href="#">Russia</a>
				          <div class="dropdown-divider"></div>
				          <a className="dropdown-item" href="#">Saudi Arabia</a>
				          <a className="dropdown-item" href="#">Singapore</a>
				          <a className="dropdown-item" href="#">Slovenia</a>
				          <a className="dropdown-item" href="#">South Korea</a>
				          <a className="dropdown-item" href="#">Spain</a>
				          <a className="dropdown-item" href="#">Switzerland</a>
				          <a className="dropdown-item" href="#">Sweden</a>
				          <div class="dropdown-divider"></div>
				          <a className="dropdown-item" href="#">Taiwan</a>
				          <div class="dropdown-divider"></div>
				          <a className="dropdown-item" href="#">United Kingdom</a>
				          <a className="dropdown-item" href="#">United States</a>
				        </div>
				      </li>		      

				      <form className="form-inline my-2 my-lg-0">
					    <input className="form-control mr-sm-2" type="search" placeholder="Search Name" aria-label="Search" />
					  </form>

					  <form className="form-inline my-2 my-lg-0">
					    <input className="form-control mr-sm-2" type="search" placeholder="Search Tags" aria-label="Search" />
					  </form>	

					  <form className="form-inline my-2 my-lg-0">
					    <div className="input-group">
					      <div className="input-group-prepend">
					        <span className="input-group-text">Publication Vol. Range</span>
					      </div>
					      <input type="number" min="0" max="500" className="form-control" defaultValue="0"/>
					      <input type="number" min="0" max="500" className="form-control mr-sm-2" defaultValue="500"/>
					    </div>
					  </form>

					  <form className="form-inline my-2 my-lg-0">
					    <div className="input-group">
					      <div className="input-group-prepend">
					        <span className="input-group-text">Author Vol. Range</span>
					      </div>
					      <input type="number" min="0" max="500" className="form-control" defaultValue="0"/>
					      <input type="number" min="0" max="500" className="form-control" defaultValue="500"/>
					    </div>
					  </form>

				    </ul>
				  </div>
				</nav>
			</div>
		)
	}
}

export default DataFilters