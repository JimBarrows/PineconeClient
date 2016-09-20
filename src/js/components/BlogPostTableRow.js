'use strict';
import React from "react";
import {ButtonGroup} from "bootstrap-react-components";

export default class BlogPostTableRow extends React.Component {

	constructor() {
		super();
	}

	edit() {
		this.props.updateBlogPost(this.props.blogPost);
	}

	render() {
		let {_id, title, publishDate, wordPressAccounts}  = this.props.blogPost;
		return (
				<tr>
					<td>{title}</td>
					<td>{publishDate}</td>
					<td>{wordPressAccounts ? wordPressAccounts.map((wpa)=>wpa.name + ", ") : "All accounts."}</td>
					<td>
						<ButtonGroup>
							<button id={_id + "EditButton"} type="button" class="btn btn-default btn-xs"
							        onClick={this.edit.bind(this)}>
								<span class="glyphicon glyphicon-pencil"/>
							</button>
							<button id={_id + "RemoveButton"} type="button" class="btn btn-danger btn-xs"
							        onClick={this.remove.bind(this)}>
								<span class="glyphicon glyphicon-remove"/>
							</button>
						</ButtonGroup>
					</td>
				</tr>
		);
	}

	remove() {
		this.props.deleteBlogPost(this.props.blogPost)
	}

}