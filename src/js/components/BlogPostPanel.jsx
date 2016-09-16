'use strict';
import BlogPostTableRow from "./BlogPostTableRow";
import React from "react";
import {ListTablePanel} from "bootstrap-react-components";


export default class BlogPostPanel extends React.Component {

	render() {
		let {
				    add, deleteItem,
				    id, items, saveItem, title
		    }    = this.props;
		let rows = items.map((blogPost, index) => <BlogPostTableRow blogPost={blogPost}
		                                                            deleteBlogPost={deleteItem}
		                                                            index={index}
		                                                            key={index}
		                                                            saveBlogPost={saveItem}/>);
		return (
				<ListTablePanel id="blogPostPanel" title="Blog Posts" onAddClick={add}>
					<thead>
					<tr>
						<th>Title</th>
						<th>Publish Date</th>
						<th>Blog</th>
					</tr>
					</thead>
					<tbody>
					{rows}
					</tbody>
				</ListTablePanel>
		);
	}
}