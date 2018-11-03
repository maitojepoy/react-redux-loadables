import React, { Component } from 'react';
import { selectChapter } from "../Actions";
import { connect } from "react-redux";
import {Link} from 'react-router-dom';

class CourseNavItem extends Component {
	render () {
		const { chapter } = this.props;
		return (
			<li key={this.key} className={this.props.selected?'selected':''}>
				<Link to={`/${chapter.slug}`} className="ptit" onClick= { () => {this.props.dispatch(selectChapter(this.props.cid));}}>{chapter.title}</Link>
				<div className="subts">
					{chapter.topics.map((topic,id) =>
						<Link to={`/${chapter.slug}/${topic.slug}`} name={topic.slug} key={id} className="subitem">{topic.title}</Link>
					)}
				</div>
			</li>
		);
	}
}

CourseNavItem.defaultProps = {
  chapter: [],
  selected: !1
};


export default connect()(CourseNavItem);