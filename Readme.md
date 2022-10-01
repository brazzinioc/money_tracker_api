# SERVERLESS API
Serverless API based on AWS Lambda and API Gateway with SAM and NodeJS.

## Development steps
- create env.json from env.example.json and set database credentials.
- run `sam build -t .\template.yml`
- run `sam local start-api --env-vars env.json`
- go to http://127.0.0.1:3000/v1/categories

## Deployment steps
- run `sam deploy -t .\template.yml`
- run `sam deploy --guided`
