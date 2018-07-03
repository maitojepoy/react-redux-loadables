import React, { Component } from 'react';
import './CourseNav.css';
import CourseNavItem from './CourseNavItem';

class CourseNav extends Component {  

  isSelected(idx) {
  	return this.props.selchapter === idx;
  }

  render() {
    const { error, loading, course } = this.props;
    return (
        <div className="topcont">
        	<h3>Topics</h3>
	        <ul>
	        {course.map((chapter,id) =>
	          <CourseNavItem key={id} cid={id} chapter={chapter} selected={this.isSelected(id)}/>
	        )}
	        </ul>
	    </div>
    );
  }
}

CourseNav.defaultProps = {
  selchapter: 0
};

export default CourseNav;