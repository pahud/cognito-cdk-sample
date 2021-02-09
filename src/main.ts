import * as cdk from '@aws-cdk/core';
import * as cognito from '@aws-cdk/aws-cognito';

export class CognitouserpoolStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const pool = new cognito.UserPool(this, 'myuserpool', {
      userPoolName: 'oidc-userpool',
      passwordPolicy: {
        minLength: 8,
        requireLowercase: false,
        requireUppercase: false,
        requireDigits: false,
        requireSymbols: false,
      },
      selfSignUpEnabled: true,
      signInAliases: {
        email: true,
      },
      autoVerify: {
        email: false,
      },
      accountRecovery: cognito.AccountRecovery.NONE,
      signInCaseSensitive: false,
    });

    const client = pool.addClient('oidc-client', {
      generateSecret: false,
      authFlows: {
        adminUserPassword: true,
        userPassword: true,
      },
      oAuth: {
        flows: {
          implicitCodeGrant: true,
        }
      },
    });
    pool.addDomain("CognitoDomain", {
      cognitoDomain: {
        domainPrefix: "oidc-userpool",
      },
    });

    new cdk.CfnOutput(this, 'PoolId', { value: pool.userPoolId })
    new cdk.CfnOutput(this, 'ClientId', { value: client.userPoolClientId })
  }
}


// for development, use account/region from cdk cli
const devEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new cdk.App();

new CognitouserpoolStack(app, 'my-stack-dev', { env: devEnv });
// new MyStack(app, 'my-stack-prod', { env: prodEnv });

app.synth();
