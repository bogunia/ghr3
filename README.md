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

The username for the GitHub user is parsed from the URL path. A list of repositories for the user is generated. 
Each list item contains the following: name, description, stars, language. 
Each repository name links to that repository in GitHub when clicked. 

The username is displayed on the page. The username links to the user’s profile in GitHub when clicked.

