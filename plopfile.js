module.exports = plop => {
  plop.setGenerator('component', {
    description: 'Create a reusable component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your component name?'
      },
    ],
    actions: [
      {
        type: 'add',
        // Plop will create directories for us if they do not exist
        // so it's okay to add files in nested locations.
        path: 'src/components/{{dashCase name}}/{{pascalCase name}}.jsx',
        templateFile: 'scripts/plop-templates/component/Component.jsx.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{dashCase name}}/{{pascalCase name}}.scss',
        templateFile: 'scripts/plop-templates/component/Component.scss.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{dashCase name}}/{{pascalCase name}}.spec.jsx',
        templateFile: 'scripts/plop-templates/component/Component.spec.jsx.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{dashCase name}}/{{pascalCase name}}.page-object.js',
        templateFile: 'scripts/plop-templates/component/Component.page-object.js.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{dashCase name}}/{{pascalCase name}}.stories.jsx',
        templateFile: 'scripts/plop-templates/component/Component.stories.jsx.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{dashCase name}}/index.js',
        templateFile: 'scripts/plop-templates/component/index.js.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{dashCase name}}/page-objects.js',
        templateFile: 'scripts/plop-templates/component/page-objects.js.hbs',
      },
      {
        // Adds an index.js file if it does not already exist
        type: 'add',
        path: 'src/components/index.js',
        templateFile: 'scripts/plop-templates/injectable-index.js.hbs',
        // If index.js already exists in this location, skip this action
        skipIfExists: true,
      },
      {
        // Adds an index.js file if it does not already exist
        type: 'add',
        path: 'src/components/page-objects.js',
        templateFile: 'scripts/plop-templates/injectable-index.js.hbs',
        // If index.js already exists in this location, skip this action
        skipIfExists: true,
      },
      {
        type: 'append',
        path: 'src/components/index.js',
        pattern: `/* PLOP_INJECT_EXPORT */`,
        template: `export * from './{{dashCase name}}'`,
      },
      {
        type: 'append',
        path: 'src/components/page-objects.js',
        pattern: `/* PLOP_INJECT_EXPORT */`,
        template: `export * from './{{dashCase name}}/page-objects'`,
      },
    ],
  })
}
