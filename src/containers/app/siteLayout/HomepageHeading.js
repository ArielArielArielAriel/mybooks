import PropTypes from 'prop-types';
import { Button, Container, Header, Icon, } from 'semantic-ui-react'
import React from 'react'
import { notImplemented } from '../common/Utils'

const HomepageHeading = ({ mobile }) => (
  <Container text>
  {/* TODO: get rid the inline styles */}
    <Header className="header-top-text"
      as='h1'
      content="Ariel's inventory book management system"
      inverted
      style={{
        fontSize: mobile ? '2em' : '4em',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop: mobile ? '1.5em' : '3em',
      }}
    />
    <Header className="header-bottom-text"
      as='h2'
      content='Awesome books, awesome system.'
      inverted
      style={{
        fontSize: mobile ? '1.5em' : '1.7em',
        fontWeight: 'normal',
        marginTop: mobile ? '0.5em' : '1.5em',
      }}
    />
    <Button primary size='huge' onClick={() => notImplemented()}>
      Get Started
        <Icon name='right arrow' />
    </Button>
  </Container>
);

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
}

export default HomepageHeading;