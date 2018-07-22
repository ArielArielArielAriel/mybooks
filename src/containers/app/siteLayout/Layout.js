import React from 'react'
import ResponsiveContainer from './ResponsiveContainer'
import { Route } from 'react-router-dom'
import Home from '../Home/Home'
import About from '../About/About'

const Layout = () => (
  <ResponsiveContainer>

    <Route exact path="/" component={Home} />
    <Route exact path="/about-us" component={About} />

  </ResponsiveContainer>
)
export default Layout;