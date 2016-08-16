'use strict';
import React from "react";
import ListPanel from "bootstrap-react-components/src/ListPanel";


export default class DestinationsListPanel extends React.Component {

	add() {

	}

	reload() {

	}

	edit() {

	}

	save() {

	}

	remove() {

	}

	render() {
		return (
				<ListPanel name="destinations" title="Destinations" onAddClick={this.add.bind(this)}
				           onReloadClick={this.reload.bind(this)}>
					<div class="row">
						<div class="col-md-4">
							<ul>
								<li><a href="http://google.com">Page 1</a></li>
								<li><a href="http://google.com">Page 1</a></li>
								<li><a href="http://google.com">Page 1</a></li>
							</ul>
						</div>
						<div class="col-md-4">
							<ul>
							</ul>
						</div>
						<div class="col-md-4">
							<ul>
							</ul>
						</div>
					</div>
				</ListPanel>
		);
	}
}