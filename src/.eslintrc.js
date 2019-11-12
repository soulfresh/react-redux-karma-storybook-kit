module.exports = {
  "extends": [
    "react-app",
    "plugin:jasmine/recommended"
  ],
  "plugins": [
    "jasmine"
  ],
  "env": {
    "jasmine": true
  },
  "rules": {
    "default-case": 0,
    "jasmine/no-spec-dups": 0,
    "jasmine/new-line-before-expect": 0,
    "jasmine/new-line-between-declarations": 0,
    "jasmine/no-disabled-tests": 0,
    "jasmine/no-focused-tests": 0,
    "jasmine/no-suite-dupes": 0,
    "jasmine/no-spec-dupes": 0,
    "jasmine/prefer-toHaveBeenCalledWith": 0,
  }
};
