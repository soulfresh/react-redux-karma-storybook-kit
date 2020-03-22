
function makeComponentActions(type = 'component') {
  let path = `${type}s`;

  const actions = [
    {
      // Name.jsx
      type: 'add',
      // Plop will create directories for us if they do not exist
      // so it's okay to add files in nested locations.
      path: `src/${path}/{{dashCase name}}/{{pascalCase name}}.jsx`,
      templateFile: `scripts/plop-templates/component/{{pascalCase '${type}'}}.jsx.hbs`,
    },
    {
      // Name.module.scss
      type: 'add',
      path: `src/${path}/{{dashCase name}}/{{pascalCase name}}.module.scss`,
      templateFile: `scripts/plop-templates/component/Component.module.scss.hbs`,
    },
    {
      // Name.spec.jsx
      type: 'add',
      path: `src/${path}/{{dashCase name}}/{{pascalCase name}}.spec.jsx`,
      templateFile: `scripts/plop-templates/component/Component.spec.jsx.hbs`,
    },
    {
      // Name.page-object.js
      type: 'add',
      path: `src/${path}/{{dashCase name}}/{{pascalCase name}}.page-object.js`,
      templateFile: `scripts/plop-templates/component/Component.page-object.js.hbs`,
    },
    {
      // components/name/index.js
      type: 'add',
      path: `src/${path}/{{dashCase name}}/index.js`,
      templateFile: `scripts/plop-templates/component/index.js.hbs`,
    },
    {
      // components/name/page-objects.js
      type: 'add',
      path: `src/${path}/{{dashCase name}}/page-objects.js`,
      templateFile: `scripts/plop-templates/component/page-objects.js.hbs`,
    },
    {
      // Adds components/index.js file if it does not already exist
      type: 'add',
      path: `src/${type}s/index.js`,
      templateFile: `scripts/plop-templates/injectable-index.js.hbs`,
      // If index.js already exists in this location, skip this action
      skipIfExists: true,
    },
    {
      // Adds components/page-objects.js file if it does not already exist
      type: 'add',
      path: `src/${type}s/page-objects.js`,
      templateFile: `scripts/plop-templates/injectable-index.js.hbs`,
      // If index.js already exists in this location, skip this action
      skipIfExists: true,
    },
    {
      type: 'append',
      path: `src/${type}s/index.js`,
      pattern: `/* PLOP_INJECT_EXPORT */`,
      template: `export * from './{{dashCase name}}';`,
    },
    {
      type: 'append',
      path: `src/${type}s/page-objects.js`,
      pattern: `/* PLOP_INJECT_EXPORT */`,
      template: `export * from './{{dashCase name}}/page-objects';`,
    },
  ];

  if (type === 'component') {
    actions.push({
      // Name.stories.jsx
      type: 'add',
      path: `src/${path}/{{dashCase name}}/{{pascalCase name}}.stories.jsx`,
      templateFile: `scripts/plop-templates/component/Component.stories.jsx.hbs`,
    });
  }

  return actions;
};

module.exports = plop => {
  plop.setGenerator('component', {
    description: 'Create a reusable component',
    prompts: [{
      type: 'input',
      name: 'name',
      message: 'What is your component name?'
    }],
    actions: makeComponentActions('component'),
  });

  plop.setGenerator('page', {
    description: 'Create a page component',
    prompts: [{
      type: 'input',
      name: 'name',
      message: 'What is your page name?'
    }],
    actions: makeComponentActions('page'),
  });
}
