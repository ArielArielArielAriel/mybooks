
import React, { Component } from 'react'
import 'semantic-ui-css/semantic.min.css';
import 'loaders.css'
import Layout from './siteLayout/Layout'
import { bindActionCreators } from 'redux'
import { getBookList } from '../../modules/books'
import { connect } from 'react-redux'
import Loader from 'react-loaders'

class App extends Component {

  componentDidMount() {
    this.props.getBookList();
  }

  render() {
    const { loader } = this.props;
    return (
      <div className={loader && "loader-background"}>
        {loader && <Loader type="pacman" />}
         <Layout color="black" />
        </div>
    );
  }
}

const mapStateToProps = ({ loader }) => ({
  loader
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getBookList
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
