# Spot Quiz Frontend

This React app is hosted in a live environment here: https://spotquiz.loboadventures.com.au
... and is designed to work in unison with it's backend api found here: https://github.com/franklia/spot-quiz-api

The purpose of the app is to assist in learning the fundamentals of any subject matter via repetition. Enter your own questions and answers, then test yourself regularly using a random question generator.

It was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## About The Project

Spot Quiz was the first end to end app I've built using React, Node, and Mongo. I also used Auth0 for user authentication. I hadn't done much with JS or no-SQL db's before, so I learned a LOT!

Like any learning exercise, you run on your instincts and move forward by trial and error. Here are some notes about what I learned and how I can improve.

### Things I've learned Across The Stack

- Compare to SQL databases, no-SQL is very flexible with how you achieve things. But with flexibility comes the need to know why and how to do things correctly. I would probably make some changes to my schema if starting out again.
- CSS - like any other framework, you need a solid CSS strategy from the outset. I used the "@material-ui/core" package which offers its own CSS structure using a version of the "styled-components". However I found that there were some issues with this e.g. it didn't play nicely with another npm package I used (react-transition-group), plus there were limitations with the theme functionality. Hence, to get a result without major refactoring, I had to use a combination of styling solutions including CSS in JS, regular stylesheets and inline styles.

### Things I Can Improve On

- Inconsistent code - there are inconsistencies in terms of syntax and methodologies because I tried different ways of doing things as I gained more experience in the frameworks. Consistent code improves productivity, especially in teams.
- Catching errors - in the quest to get the project up and running I did not handling exceptions but it needs them.
- Unit Tests - I did not write tests for this app but I should have.
- Bloated components - generally speaking, my components are too large and should be split up into smaller components.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- NPM
- React.js
- Your own Auth0 account: https://auth0.com/

### Installation

Clone the repo and install dependencies:

- Clone the repo `git clone https://github.com/franklia/sq-ui.git`
- Navigate into the repo `cd sq-ui`
- Run `npm install` to install the node modules

Set up Auth0 account:

- Go to https://auth0.com/ and create an Auth0 account.
- Create a new Application called "Spot Quiz", then configure the following settings:
- Application Type = Single Page Application
- Allowed callback URL's: http://localhost:3000/callback
- Allowed web origins: http://localhost:3000, [your Auth0 domain]
- Allowed logout URL's: http://localhost:3000
- Allowed origins (CORS): http://localhost:3000
- Click save

Set up your environment variables:

- Create a .env.local file in the root directory using the template below

REACT_APP_AUTH0_DOMAIN=[your Auth0 domain]
REACT_APP_AUTH0_CLIENT_ID=[your Auth0 client ID]
REACT_APP_REDIRECT_URL=http://localhost:3000/callback
REACT_APP_AUDIENCE=http://localhost:3001/api/
REACT_APP_API_URI=http://localhost:3001/api

Launch app:

- Run `npm start` to start your local server, view the app on http://localhost:3000
- Click "Login / Sign Up" and create a user which will act as your admin user

## Author & Licence

This project was written by Frank Liardet
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## About Create React App

### Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
