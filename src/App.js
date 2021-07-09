import React from 'react';
import { Box, Button, Heading, Grommet, Text } from 'grommet';
import { hpe } from 'grommet-theme-hpe';
import {   
  BrowserRouter as Router,
  Route,
  Switch,
  useParams } from "react-router-dom";
import axios from "axios";
import {
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

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

// const noUserProvided = () => (
//   <Box fill align='center' justify='center'>
//     <Text>text in the box via a function</Text>
//   </Box>
// );

const queryClient = new QueryClient();

function App() {
  const [repoId, setRepoId] = React.useState(-1);

  return (
    <Grommet theme={ hpe } full>
    <Router>
      <Switch>
        <Route path="/:userName">
          <QueryClientProvider client={queryClient}>
            <Box fill>
              <AppHeader>
                <Heading level='3' margin='none'>nameHere </Heading>
                <Button onClick={() => {}} >Load more</Button>
              </AppHeader>
              <Box flex align='center' justify='center'>
                <Repos setRepoId={setRepoId} />
              </Box>
              <ReactQueryDevtools initialIsOpen />
            </Box>
          </QueryClientProvider>
        </Route>
        <Route path="/">
          <Box fill align='center' justify='center'>
            <Text color="red">Provide a GitHub user name in the URL, for example: https://localhost:3000/octocat</Text>
          </Box>
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

function Repos({ setRepoId }) {
  const queryClient = useQueryClient();
  const { status, data, error, isFetching } = useRepos();
//  const { userName } = useParams();

  return (
    <div>
      <div>
        {status === "loading" ? (
          "Loading..."
        ) : status === "error" ? (
          <span>Error: {error.message}</span>
        ) : (
          <>
            <div>
              {data.map((repo) => (
                <p key={repo.id}>
                  <a href={repo.html_url} target='repoWindow'>
                    {repo.name}
                  </a>
                </p>
              ))}
            </div>
            <div>{isFetching ? "Background Updating..." : " "}</div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
