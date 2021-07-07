import React from 'react';
import { Box, Button, Heading, Grommet } from 'grommet';
import { hpe } from 'grommet-theme-hpe';
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

const queryClient = new QueryClient();

function App() {
  const [repoId, setRepoId] = React.useState(-1);

  return (
    <QueryClientProvider client={queryClient}>
      <Grommet theme={ hpe } full>
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
      </Grommet>
    </QueryClientProvider>
  );
}

function useRepos() {
  return useQuery("repos", async () => {
    const { data } = await axios.get(
      "https://api.github.com/users/octocat/repos"
    );
    return data;
  });
}

function Repos({ setRepoId }) {
  const queryClient = useQueryClient();
  const { status, data, error, isFetching } = useRepos();

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
