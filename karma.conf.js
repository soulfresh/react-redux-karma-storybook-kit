const path = require('path');
const webpack = require('webpack');
const testHelperPath = path.resolve('src/testHelper.js')

// If the `jasmine-timeout` parameter is passed, set Jasmine's timeout.
const timeoutArg = process.argv.filter((arg) => arg.indexOf('jasmine-timeout') > 0);
const timeout = timeoutArg.length > 0
  ? parseInt(timeoutArg[0].split('=')[1], 10)
  : 5000;

const browserLogs = process.argv.filter((arg) => arg.indexOf('browser-loglevel') > 0);
const browserLogLevel = browserLogs.length < 1
  ? 'none'
  : browserLogs[0].split('=')[1];

// If the 'coverageType' parameter was passed, add coverage reporting.
const coverageReporterArg = process.argv.filter((arg) => arg.indexOf('coverageType') > 0)[0];
const coverageType = coverageReporterArg ? coverageReporterArg.split('=')[1] : '';
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

var coverageConfig = {
  reporters: coverageReporters,
};

if (coverageType === 'ci' || coverageType === 'details') {
  const min = 60;
  coverageConfig.check = {
    global: {
      statements: min,
      lines: min,
      functions: min,
      branches: min
    }
  };
}

// Set the React environment to 'test'.
process.env.BABEL_ENV = 'test';

module.exports = function(config) {
  config.set({
    browsers: ['Chrome'],
    frameworks: ['jasmine', 'jasmine-matchers'],

    files: [
      testHelperPath
    ],

    preprocessors: {
      [testHelperPath]: [ 'webpack', 'sourcemap' ]
    },

    webpack: {
      mode: 'development',
      devtool: 'inline-source-map',
      plugins: [
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify('test')
          }
        })
      ],
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
                test: /\.(scss|css)$/,
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
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
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

    coverageReporter: coverageConfig,

    browserConsoleLogOptions: {
      level: browserLogLevel
    }
  })
};
