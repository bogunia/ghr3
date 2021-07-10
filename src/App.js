import React from 'react';
import {
  Box,
  Button,
  Heading,
  Grommet,
  List,
  Paragraph,
  Text } from 'grommet';
import { hpe } from 'grommet-theme-hpe';
import { Star } from 'grommet-icons';
import {   
  BrowserRouter as Router,
  Route,
  Switch,
  useParams } from "react-router-dom";
import axios from "axios";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { RepoIdentifier } from './components/RepoIdentifier';

const AppHeader = (props) => (
  <Box
    tag='header'
    direction='row'
    align='center'
    justify='between'
    background='brand'
    pad={{ left: 'medium', right: 'small', vertical: 'small' }}
    elevation='medium'
    style={{ zIndex: '1' }}
    {...props}
  />
);

const UserNameLink = () => {
    const { userName } = useParams();
    const userProfileHref = `https://github.com/${userName}`;
    return (
      <Heading level='3' margin='none'> 
        <a href={ userProfileHref } target='userWindow'>
          { userName }
        </a>
      </Heading>
    );
}

const NoUserProvided = () => {
  return (
    <Box fill align='center' justify='center'>
      <Text color="red">Provide a GitHub user name in the URL, for example: https://localhost:3000/octocat</Text>
    </Box>
  );
}

const queryClient = new QueryClient();

function App() {
  return (
    <Grommet theme={ hpe } full>
      <Router>
        <Switch>
          <Route path="/:userName">
            <QueryClientProvider client={queryClient}>
              <Box fill>
                <AppHeader>
                  <UserNameLink />
                  <Button onClick={() => {}} >Load more</Button>
                </AppHeader>
                <Box flex align='center' justify='center'>
                  <Repos />
                </Box>
              </Box>
            </QueryClientProvider>
          </Route>
          <Route path="/">
            <NoUserProvided />
          </Route>
        </Switch>
      </Router>
    </Grommet>
  );
}

function useRepos() {
  const { userName } = useParams();
  return useQuery("repos", async () => {
    const { data } = await axios.get(
      `https://api.github.com/users/${userName}/repos`
    );
    return data;
  });
}

function Repos() {
  const { status, data, error, isFetching } = useRepos();

  return (
    <Box
      width='100%'
      style={{position: 'relative'}}
      overflow='auto' 
      pad={{ horizontal: 'medium', bottom: 'medium' }}
      flex
    >
      {status === "loading" ? (
        <Paragraph>Loading...</Paragraph>
      ) : status === "error" ? (
        <Paragraph color="red">Error: {error.message}</Paragraph>
      ) : (
        <Box>
          <List
            data={data}
            pad="small"
            background='light-2'
          >
            {(datum) => (
              <Box direction="row" align="center" justify="between">
                <RepoIdentifier
                  title={ datum.name }
                  subTitle={ datum.description }
                  subSubTitle={ datum.language }
                  htmlUrl={ datum.html_url }
                  gap="medium"
                  size="small"
                  direction="row"
                />
                <Box direction="row" align="center">
                  { datum.stargazers_count }
                  <Star color="yellow"/>
                </Box>
              </Box>
            )}
          </List>
          <Paragraph>{isFetching ? "Background Updating..." : " "}</Paragraph>
        </Box>
      )}
    </Box>
  );
}

export default App;
