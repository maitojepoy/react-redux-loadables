import React, { PureComponent } from 'react';
import './App.css';
import { connect } from "react-redux";
import { fetchJSON } from "./Actions";
import CourseNav from './components/CourseNav';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Loadable from 'react-loadable';

const Loading = () => <div>Loading...</div>;

class App extends PureComponent {
  componentDidMount() {
    this.props.dispatch(fetchJSON());
  }

  _genLoadable(co,slug) {
    const comp = Loadable({
          loader: () => import(`./topics/${co}`),
          loading: Loading
        });
    return { comp, slug };
  }

  makeLoadables(_co, lvl='') {
    var loadables = [];
    for (let i=0; i<_co.length; i++) {
      let _coi = _co[i];
      let _slug = `${lvl}/${_coi['slug']}`;
      let _hsm = !1;
      if (_coi.component) {
        _hsm = !0;
        loadables.push( this._genLoadable(_coi.component,_slug) );
      }
      if ('topics' in _coi) {
        if (!_hsm && _coi.topics[0].component) 
          loadables.push(this._genLoadable(_coi.topics[0].component,_slug));

        loadables.push(...this.makeLoadables(_coi.topics,_slug));
      }
    }
    return loadables;
  }

  render() {
    const { error, loading, course, chapter } = this.props;
    const chunks = this.makeLoadables(course);
    window.course = course;
    window.chunks = chunks;
    return (
      <Router>
      <div className="App">
          <CourseNav error={error} selchapter={chapter} loading={loading} course={course} />
          <div className="rcont">
            <Switch>  
              {chunks.map( (x, i) => (
                <Route exact path={x.slug} key={i} component={x.comp}/>
              ))}
            </Switch>
          </div>
      </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  course: state.course,
  loading: state.loading,
  error: state.error,
  chapter: state.cselected
});

export default connect(mapStateToProps)(App);
