'use strict';
import React from "react";
import Panel from "./Panel";
import PanelHeader from "./PanelHeader";
import PanelBody from "./PanelBody";
import AddButton from "../controls/AddButton";
import ReloadButton from "../controls/ReloadButton";


export default class ListTablePanel extends React.Component {

	render() {
		let {title, onReloadClick, onAddClick} = this.props;
		let reloadButtonId                     = title.replace(/ /g, '') + "ReloadButton";
		let addButtonId                        = title.replace(/ /g, '') + "AddButton";
		return (
				<Panel>
					<PanelHeader>
						<div class="panel-title pull-left">{title}</div>
						<div class="btn-group pull-right">
							<ReloadButton id={reloadButtonId} onClick={onReloadClick}/>
							<AddButton id={addButtonId} onClick={onAddClick}/>
						</div>
					</PanelHeader>
					<PanelBody>
						{this.props.children}
					</PanelBody>
				</Panel>
		);
	}
}