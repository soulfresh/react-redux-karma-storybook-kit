
/*
 * A Map of route names to `Route` objects.
 *
 * @typedef {Object} Route
 * @property {string} path - The path with replacement variables.
 *
 * @const {Map} Routes
 */
export const Routes = new Map([
  [ 'HOME'   , {path: '/'}],
  [ 'LOGIN'  , {path: '/login'}],
  [ 'FOO'    , {path: '/foo/:fooId'}],
]);

/*
 * Get the URL for a specific route with path parameters
 * replaced.
 *
 * @param {string} name - The name of the route (key) in the Routes map.
 * @param {Object} [parameters] - An object with the parameters to replace.
 *   Each key in the parameter should match a variable token in the route
 *   (without the leading ':'). If parameters is not passed, the raw
 *   path is returned.
 *
 *   Ex: {fooId: 123} will replace the foo id token in the route
 *   `/foo/:fooId/new` with the value 123.
 *
 * @return {string} The url that can be used to route to a specific page.
 */
export function getRoute(name, parameters) {
  const route = Routes.get(name);
  if (!route) {
    console.error('Could not find route called', name);
    return '#';
  }

  let r = route.path;
  if (parameters) {
    Object.keys(parameters).forEach((key) => r = r.replace(`:${key}`, parameters[key]));
  }
  return r;
}

/*
 * Get a parameter from the react-router `match`
 * object, doing any necessary casting.
 */
export function getRouteParam(name, match) {
  // Allow passing either the `match` object or
  // the `match.params` object.
  const params = match.params ? match.params : match;

  switch(name) {
    case 'fooId':
      return Number(params[name]);
    default:
      return params[name];
  }
}

