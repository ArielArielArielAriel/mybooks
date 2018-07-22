import PropTypes from 'prop-types';
import { withRouter } from 'react-router'
import { Button, Container, Menu, Responsive, Segment, Visibility } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import React, { Component } from 'react'
import HomepageHeading from './HomepageHeading'

class DesktopContainer extends Component {
  state = {}

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  render() {

    const { children, location } = this.props;
    const { fixed } = this.state;

    return (
      <Responsive {...Responsive.onlyComputer}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign='center'
            style={{ minHeight: 700, padding: '1em 0em' }}
            vertical
          >
            <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size='large'
            >
              <Container>
                <Menu.Item as='a' className={location.pathname === '/' ? 'active' : null}>
                  <NavLink to="/" activeClassName="active">Home</NavLink>
                </Menu.Item>
                <Menu.Item as='a' className={location.pathname === '/about-us' ? 'active' : null}><NavLink activeClassName="active" to="/about-us">About</NavLink></Menu.Item>

                <Menu.Item position='right'>
                  <Button as='a' inverted={!fixed}>
                    Log in
                    </Button>
                  <Button as='a' inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>
                    Sign Up
                    </Button>
                </Menu.Item>
              </Container>
            </Menu>

            <HomepageHeading />

          </Segment>
        </Visibility>
        {children}
      </Responsive>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

export default withRouter(DesktopContainer);