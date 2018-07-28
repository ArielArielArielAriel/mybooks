import React from 'react'
import { Container, Grid, Header, List, Segment } from 'semantic-ui-react'
import BookList from './BookList'

const Home = () => (
  <React.Fragment>
    <Segment className="home-wrapper" vertical>
      <Grid container stackable verticalAlign='middle'>
        <Grid.Row>
          <Grid.Column width={16}>
            <BookList />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>

  </React.Fragment>
);

export default Home;