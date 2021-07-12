# ghr3

List GitHub repositories for a specified user.

ghr - GitHub repositories

## Development environment

### Pre-reqs

- npm

### Clone repository and install requirements

Clone the repository and use npm to install all the requirements.
If using HTTPS:

```bash
$ git clone https://github.com/bogunia/ghr3.git
  ...
$ cd ghr3
$ npm install
```

### To run locally

Run:

```bash
$ npm start
```

In a browser, e.g.:
```bash
localhost:3000/octocat
localhost:3000/gandalf
localhost:3000
```

## Project Status

I used grommet and react-query in this project.

The username for the GitHub user is parsed from the URL path. A list of repositories for the user is generated. 
Each list item contains the following: name, description, stars, language. 
Each repository name links to that repository in GitHub when clicked. 

The username is displayed on the page. The username links to the user’s profile in GitHub when clicked.

To do: pass a token with the requests and add pagination.

To improve quality: 
Move some pieces to components. 
Handling of corner cases - better messages, make more consistent (e.g. when no public repositories).
Add onClick to a row.
Add unit tests.
