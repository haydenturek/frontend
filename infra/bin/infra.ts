#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib'
import { FrontendStack } from '../lib/frontend-stack'
import { APP_NAME } from 'haydenturek-constants'

const app = new cdk.App()

const appName = APP_NAME
const environment = app.node.tryGetContext('environment') || 'dev'

const frontendStack = new FrontendStack(
  app,
  `${appName}-${environment}-frontend-stack`,
  {
    appName,
    environment,
    description: 'Frontend stack for frontend service',
    env: {
      account: process.env.CDK_DEFAULT_ACCOUNT,
      region: process.env.CDK_DEFAULT_REGION
    }
  }
)

// Add tags to all stacks
const tags = {
  Environment: environment,
  Service: 'frontend-service',
  Application: appName
}

Object.entries(tags).forEach(([key, value]) => {
  cdk.Tags.of(frontendStack).add(key, value)
})

app.synth()
