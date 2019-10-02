const path = require('path');
const testHelperPath = path.resolve('src/testHelper.js')

// If the `jasmine-timeout` parameter is passed, set Jasmine's timeout.
const timeoutArg = process.argv.filter((arg) => arg.indexOf('jasmine-timeout') > 0);
const timeout = timeoutArg.length > 0
  ? parseInt(timeoutArg[0].split('=')[1], 10)
  : 5000;

// If the 'coverageType' parameter was passed, add coverage reporting.
const coverageReporterArg = process.argv.filter((arg) => arg.indexOf('coverageType') > 0)[0];
const coverageType = coverageReporterArg.split('=')[1];
let coverageReporters;
switch(coverageType) {
  case 'summary':
    coverageReporters = [{type: 'text-summary'}];
    break;
  case 'details':
    coverageReporters = [{type: 'text'}, {type: 'text-summary'}];
    break;
  case 'ci':
    coverageReporters = [
      {type: 'lcov', subdir: 'report-html'},
      {type: 'text'},
      {type: 'text-summary'}
    ];
    break;
  default:
    coverageReporters = [];
    break;
}

// Set the React environment to 'test'.
process.env.BABEL_ENV = 'test';

module.exports = function(config) {
  config.set({

    // https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],

    // https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'jasmine-matchers'],

    // list of files / patterns to load in the browser
    files: [
      testHelperPath
    ],

    preprocessors: {
      [testHelperPath]: [ 'webpack', 'sourcemap' ]
    },

    webpack: {
      mode: 'development',
      devtool: 'inline-source-map',
      resolve: {
        alias: {
          '~': path.resolve(__dirname, 'src/'),
          '~assets': path.resolve(__dirname, 'src/assets'),
          '~components': path.resolve(__dirname, 'src/components'),
          '~pages': path.resolve(__dirname, 'src/pages'),
          '~store': path.resolve(__dirname, 'src/store'),
        }
      },
      module: {
        rules: [
          {
            oneOf: [
              // Process application JS with Babel.
              // The preset includes JSX, Flow, TypeScript, and some ESnext features.
              {
                test: /\.(js|mjs|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                  presets: ['react-app']
                },
              },
              {
                test: /\.svg$/,
                // Load SVG as ReactComponent
                use: ['@svgr/webpack', 'url-loader'],
              },
              {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                  'file-loader'
                ]
              },
              {
                test: /\.scss$/,
                use: [
                  "style-loader", // creates style nodes from JS strings
                  "css-loader", // translates CSS into CommonJS
                  {
                    loader: 'sass-loader',
                    options: {
                      includePaths: ['src']
                    },
                  },
                ]
              }
            ]
          }
        ]
      }
    },

    webpackMiddleware: {
      // only output webpack error messages
      // stats: 'errors-only'
      noInfo: true //please don't spam the console when running in karma!
    },

    // Jasmine configuration
    client: {
      jasmine: {
        random: true,
        failFast: false,
        timeoutInterval: timeout
      }
    },

    junitReporter: {
      outputDir: './test-results/karma',
      outputFile: 'junit.xml',
      useBrowserName: true
    },

    coverageReporter: {
      reporters: coverageReporters
    },

    browserConsoleLogOptions: {
      level: 'disable'
    }
  })
};
