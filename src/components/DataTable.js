import React from 'react'

class DataTable extends React.Component {
	render() {
		return (
			<table class="table container">
			  <thead class="thead-light">
			    <tr>
			      <th scope="col">Account Name</th>
			      <th scope="col">Account Type</th>
			      <th scope="col">Publication Volume</th>
			      <th scope="col">Author Volume</th>
			      <th scope="col">Location</th>
			      <th scope="col">Tags</th>
			    </tr>
			  </thead>
			  <tbody>
			    <tr>
			      <th scope="row">1</th>
			      <td>Mark</td>
			      <td>Otto</td>
			      <td>@mdo</td>
			    </tr>
			    <tr>
			      <th scope="row">2</th>
			      <td>Jacob</td>
			      <td>Thornton</td>
			      <td>@fat</td>
			    </tr>
			    <tr>
			      <th scope="row">3</th>
			      <td>Larry</td>
			      <td>the Bird</td>
			      <td>@twitter</td>
			    </tr>
			  </tbody>
			</table>
		)
	}
}

export default DataTable