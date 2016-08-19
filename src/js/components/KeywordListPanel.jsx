'use strict';
import React from "react";
import {ListPanel} from "bootstrap-react-components";
import RowControlButtons from "../components/controls/RowControlButtons";


export default class KeywordsListPanel extends React.Component {

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
				<ListPanel name="keywords" title="Keywords" onAddClick={this.add.bind(this)}
				           onReloadClick={this.reload.bind(this)}>
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
				</ListPanel>
		);
	}
}