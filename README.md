This is the Build UI for dotFoliov3.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app)
and [Redux Starter Kit](https://redux-starter-kit.js.org/). It uses
[Karma](https://karma-runner.github.io/latest/index.html)
with [Jasmine](https://jasmine.github.io/) for testing and
[Storybook](https://storybook.js.org/) for component development.


## Environments

### Staging Environment


Any commit pushed to master will automatically be released to the stage
environment if the build on CircleCI passes.


### Production Environment


### CircleCI


This project is configured so that commits to the master branch are automatically
pushed to the Heroku staging environment.


#### Artifacts

CircleCI builds will generate artifacts with test results and code bundle
analysis that can be found in the artifacts tab of the build.

`coverage/report-html/lcov-report/index.html` - contains a browsable HTML code coverage report.
`coverage/analysis/result.html` - contains the bundle size analysis.
`coverage/junit` - contains machine readable junit test coverage output.

### Storybook


The storybook (component library) for this project is updated automatically
when new commits are pushed to the master branch. You can also run the
`deploy-storybook` script to release to this environment manually.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm test-debug`

Run tests with a longer timeout in order to avoid timeout issues while stepping through code with a debugger.

### `npm lint`

Run ESLint and Styleing.

### `npm validate`

Run linting and tests locally in a manner similar to how they are run on the CI server.
This includes generating code coverage reports and bundle analysis.

### `npm coverage`

Generate code coverage reports for the project. This will both print coverage statistics
to the console and will generage coverage files including an HTML coverage report.
Coverage files are generated into the `./coverage` directory.

`coverage/report-html/lcov-report/index.html` - contains a browsable HTML code coverage report.

### `npn analyze`

Run production build code bundle size analysis. This generates an HTML report of your
bundle sizes that you can explore to see where code bloat comes from.

`coverage/analysis/result.html` - contains the bundle size analysis.

### `npm storybook`

Run the storybook component website for browsing project components.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run release`

Release the app to Heroku. You will probably need to be logged into Heroku.
It will deploy the project as it currently exists on your file system (ie. will not deploy a specific branch or tag).

### `npm deploy-storybook`

Build the most recent storybook app and publish it to this project's GitHub pages.

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
