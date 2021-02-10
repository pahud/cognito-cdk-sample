const { AwsCdkTypeScriptApp } = require('projen');

const project = new AwsCdkTypeScriptApp({
  cdkVersion: '1.73.0',
  defaultReleaseBranch: 'main',
  jsiiFqn: "projen.AwsCdkTypeScriptApp",
  name: 'cognito-cdk-sample',
  cdkDependencies: [
    '@aws-cdk/aws-cognito',
  ],
  dependabot: false,
});

const common_exclude = ['cdk.out', 'cdk.context.json', 'yarn-error.log', 'dependabot.yml'];
project.npmignore.exclude(...common_exclude);
project.gitignore.exclude(...common_exclude);

project.synth();
