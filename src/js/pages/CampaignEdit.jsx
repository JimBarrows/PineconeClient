'use strict';
import React from "react";
import PageHeader from "bootstrap-react-components/src/PageHeader";
import TextFormGroup from "bootstrap-react-components/src/TextFormGroup";
import FormGroup from "bootstrap-react-components/src/FormGroup";
import DatePickerFormGroup from "bootstrap-react-components/src/DatePickerFormGroup";
import RowControlButtons from "../components/RowControlButtons";
import TablePanel from "bootstrap-react-components/src/TablePanel";


export default class CampaignForm extends React.Component {

	fieldChange(event) {

	}

	edit() {

	}

	save() {

	}

	remove() {

	}

	add() {

	}

	render() {
		return (
				<form >
					<PageHeader title="Define Campaign"/>
					<TextFormGroup label="Name" name="name" onChange={this.fieldChange.bind(this)} error="" value=""
					               placeholder="Christmas Campaign" disabled={false}/>
					<DatePickerFormGroup label="Starts" name="startDate" onChange={this.fieldChange.bind(this)} error="" value=""
					                     disabled={false}/>
					<DatePickerFormGroup label="Ends" name="endDate" onChange={this.fieldChange.bind(this)} error="" value=""
					                     disabled={false}/>
					<FormGroup label="Tags" name="tags">
						<input type="text" class="form-control" placeholder="Tags"/>
					</FormGroup>
					<div class="panel panel-default">
						<div class="panel-heading clearfix">
							<h3 class="panel-title pull-left">Objectives</h3>
							<div class="btn-group pull-right">
								<button class="btn btn-xs btn-success">
									<span class="glyphicon glyphicon-plus"
									      aria-hidden="true"></span>
								</button>
							</div>
						</div>
						<div class="panel-body">
							<div class="row">
								<div class="col-md-4">
									<ul>
										<li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.<RowControlButtons editing={false}
										                                                                               edit={this.edit.bind(this)}
										                                                                               save={this.save.bind(this)}
										                                                                               remove={this.remove.bind(this)}/>
										</li>
										<li>Morbi ac turpis fringilla, lobortis purus sed, tincidunt sapien.<RowControlButtons
												editing={false} edit={this.edit.bind(this)} save={this.save.bind(this)}
												remove={this.remove.bind(this)}/></li>
										<li>Curabitur at magna sed lectus euismod mattis.<RowControlButtons editing={false}
										                                                                    edit={this.edit.bind(this)}
										                                                                    save={this.save.bind(this)}
										                                                                    remove={this.remove.bind(this)}/>
										</li>
										<li>Vestibulum id ante at turpis faucibus vestibulum in et nulla.<RowControlButtons editing={false}
										                                                                                    edit={this.edit.bind(this)}
										                                                                                    save={this.save.bind(this)}
										                                                                                    remove={this.remove.bind(this)}/>
										</li>
										<li>Phasellus condimentum dolor sit amet erat interdum, eget posuere sem
											dignissim.<RowControlButtons editing={false} edit={this.edit.bind(this)}
											                             save={this.save.bind(this)}
											                             remove={this.remove.bind(this)}/></li>
									</ul>
								</div>
								<div class="col-md-4">
									<ul>
										<li>Nam hendrerit risus porttitor elit condimentum mollis.<RowControlButtons editing={false}
										                                                                             edit={this.edit.bind(this)}
										                                                                             save={this.save.bind(this)}
										                                                                             remove={this.remove.bind(this)}/>
										</li>
										<li>Sed imperdiet orci id felis feugiat commodo.<RowControlButtons editing={false}
										                                                                   edit={this.edit.bind(this)}
										                                                                   save={this.save.bind(this)}
										                                                                   remove={this.remove.bind(this)}/>
										</li>
										<li>Morbi vel ligula nec enim euismod hendrerit.<RowControlButtons editing={false}
										                                                                   edit={this.edit.bind(this)}
										                                                                   save={this.save.bind(this)}
										                                                                   remove={this.remove.bind(this)}/>
										</li>
										<li>Phasellus vulputate magna vitae vehicula suscipit.<RowControlButtons editing={false}
										                                                                         edit={this.edit.bind(this)}
										                                                                         save={this.save.bind(this)}
										                                                                         remove={this.remove.bind(this)}/>
										</li>
										<li>Praesent id nulla porttitor, lacinia purus ut, commodo eros.<RowControlButtons editing={false}
										                                                                                   edit={this.edit.bind(this)}
										                                                                                   save={this.save.bind(this)}
										                                                                                   remove={this.remove.bind(this)}/>
										</li>
										<li>Quisque nec nunc at diam blandit sodales eget rhoncus enim.<RowControlButtons editing={false}
										                                                                                  edit={this.edit.bind(this)}
										                                                                                  save={this.save.bind(this)}
										                                                                                  remove={this.remove.bind(this)}/>
										</li>
									</ul>
								</div>
								<div class="col-md-4">
									<ul>
										<li>Etiam tempor sapien a sollicitudin efficitur.<RowControlButtons editing={false}
										                                                                    edit={this.edit.bind(this)}
										                                                                    save={this.save.bind(this)}
										                                                                    remove={this.remove.bind(this)}/>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
					<h1>Messages
						<button class="btn btn-xs btn-success">
									<span class="glyphicon glyphicon-plus"
									      aria-hidden="true"></span>
						</button>
					</h1>
					<div class="row">
						<div class="col-md-4">
							<ul>
								<li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
								<li>Morbi ac turpis fringilla, lobortis purus sed, tincidunt sapien.</li>
								<li>Curabitur at magna sed lectus euismod mattis.</li>
								<li>Vestibulum id ante at turpis faucibus vestibulum in et nulla.</li>
								<li>Phasellus condimentum dolor sit amet erat interdum, eget posuere sem dignissim.</li>
							</ul>
						</div>
						<div class="col-md-4">
							<ul>
								<li>Nam hendrerit risus porttitor elit condimentum mollis.</li>
								<li>Sed imperdiet orci id felis feugiat commodo.</li>
								<li>Morbi vel ligula nec enim euismod hendrerit.</li>
								<li>Phasellus vulputate magna vitae vehicula suscipit.</li>
								<li>Praesent id nulla porttitor, lacinia purus ut, commodo eros.</li>
								<li>Quisque nec nunc at diam blandit sodales eget rhoncus enim.</li>
							</ul>
						</div>
						<div class="col-md-4">
							<ul>
								<li>Etiam tempor sapien a sollicitudin efficitur.</li>
							</ul>
						</div>
					</div>
					<h1>Channels</h1>
					<ul>
						<li>Channel 1</li>
						<li>Channel 2</li>
						<li>Channel 3</li>
					</ul>
					<h1>Budget</h1>
					<table class="table table-striped">
						<thead>
						<tr>
							<th>Item</th>
							<th>Unit Cost</th>
							<th>Quantity</th>
							<th>Amount</th>
						</tr>
						</thead>
						<tbody>
						<tr>
							<td>
								<input type="text" class="form-control" placeholder="Facebook Adds"/>
							</td>
							<td>
								<input type="number" class="form-control" aria-label="Amount (to the nearest dollar)"/>
							</td>
							<td>
								<input type="number" class="form-control"/>
							</td>
							<td>
								<input type="number" class="form-control" aria-label="Amount (to the nearest dollar)"/>
							</td>
							<td>
								<RowControlButtons editing={false} edit={this.edit.bind(this)} save={this.save.bind(this)}
								                   remove={this.remove.bind(this)}/>
							</td>
						</tr>
						</tbody>
					</table>
					<h1>Keywords</h1>
					<ul>
						<li>keyword 1</li>
						<li>keyword 2</li>
						<li>keyword 3</li>
					</ul>
					<h1>Landing Pages</h1>
					<ul>
						<li><a href="http://google.com">Page 1</a></li>
						<li><a href="http://google.com">Page 1</a></li>
						<li><a href="http://google.com">Page 1</a></li>
					</ul>
					<h1>Assets</h1>
					<table class="table table-striped">
						<thead>
						<tr>
							<th>Name</th>
							<th>Type</th>
							<th>Size</th>
							<th>Location</th>
						</tr>
						</thead>
						<tbody>
						<tr>
							<td>Campaign Logo</td>
							<td>PNG</td>
							<td>1,200k</td>
							<td><a href="https://dropbox.com">Dropbox/campaignName/images/campaignLog.png</a></td>
							<td>
								<RowControlButtons editing={false} edit={this.edit.bind(this)} save={this.save.bind(this)}
								                   remove={this.remove.bind(this)}/>
							</td>
						</tr>
						<tr>
							<td>Audio Spot 1</td>
							<td>mp3</td>
							<td>1,200k</td>
							<td><a href="https://dropbox.com">Dropbox/campaignName/audio/spot1.mp3</a></td>
							<td>
								<RowControlButtons editing={false} edit={this.edit.bind(this)} save={this.save.bind(this)}
								                   remove={this.remove.bind(this)}/>
							</td>
						</tr>
						</tbody>
					</table>
					<TablePanel title="Content" addRow={this.add.bind(this)}>
						<table class="table table-striped">
							<thead>
							<tr>
								<th>Title</th>
								<th>Publish Date</th>
								<th>Channels</th>
							</tr>
							</thead>
							<tbody>
							<tr>
								<td>1,000 ways to make money onn Facebook</td>
								<td>12/1/2016</td>
								<td>Twitter, Linked In</td>
								<td><RowControlButtons editing={false} edit={this.edit.bind(this)} save={this.save.bind(this)}
								                       remove={this.remove.bind(this)}/></td>
							</tr>
							</tbody>
						</table>
					</TablePanel>
				</form>
		);
	}
}