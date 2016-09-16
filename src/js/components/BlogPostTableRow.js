'use strict';
import React from "react";

export default class ContentRow extends React.Component {

	render() {
		let {editing}                                                                                             = this.state;
		let {title, publishDate, wordpress}                                                                       = this.props.blogPost;
		return (
				<tr>
					<td>{title}</td>
					<td>{publishDate}</td>
					<td>{wordPress.wordPressAccounts.map((wpa)=>wpa.name + ", ")}</td>
					<td>
						<RowControlButtons editing={editing} edit={this.edit.bind(this)} save={this.save.bind(this)}
						                   remove={this.remove.bind(this)}/>
					</td>
				</tr>
		);
	}

	remove() {
		this.props.deleteBlogPost(this.props.blogPost)
	}

	save() {
		this.props.saveBlogPost(this.props.blogPost);
		this.setState({
			editing: false
		});
	}
}