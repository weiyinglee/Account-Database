//import dependencies
import React, { Component } from 'react'

class Header extends Component {
	render() {
		return (
			<header>
				<div className="container">
					<h1>Welcome to LBx Product Database</h1>
					<p>
						I love watching Doug Demuro's Youtube channel and as you probably know, 
						Doug the type of guy to rank cars and keep a spreadsheet with the scores. 
						I decided to take it a bit further and have a way to filter, search and sort the cars.
					</p>
				</div>
			</header>
		)
	}
}

export default Header