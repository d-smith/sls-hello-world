# sls-hello-world

Serverless hello world, generated as per [this documentation](https://serverless.com/framework/docs/providers/aws/guide/quick-start/) with some minor differences:

* The node 8 runtime is used
* The IAM role is explicitly defined, with the role arn referenced via an environment variable in serverless.yml


## Deployment

### Create IAM Role


To deploy, first use the `create-iam-stack.sh` script to instantiate the stack that defines the IAM role. Note the script takes 4 arguments:

````console
$ ./create-iam-stack.sh 
Usage: create-stack <stack name> <stage> <service> <function>
````

For stack name, use whatever you want, assuming it conforms to AWS CloudFormation [stack name requirements](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-using-console-create-stack-parameters.html).

For stage, specify the serverless stage name you are working with. If you are using the default, specify `dev`.

For `service`, use service from serverless.yml, which in this example is `sls-hello-world`. Similarly, for function use the function in serverless.yml the policy is intended for, which in this cases is `hello`.

````console
$ ./create-iam-stack.sh iamstackage dev sls-hello-world hello
{
    "StackId": "arn:aws:cloudformation:us-east-1:nnnnnnnnnnnn:stack/iamstackage/61c8eb50-8070-11e8-b2f8-503acac41e35"
}
````

Note the script uses the [AWS CLI](https://aws.amazon.com/cli) to deploy the stack.

### Extract Role Arn

The role ARN created by `create-iam-stack.sh` can be obtained using the AWS CLI:

````console
$ aws cloudformation describe-stacks --stack-name iamstackage --query 'Stacks[0].{Outputs:Outputs}'
{
    "Outputs": [
        {
            "OutputKey": "LambdaRoleArn",
            "OutputValue": "arn:aws:iam::nnnnnnnnnnnn:role/sls-hello-world-us-east-1-lambdaRole"
        }
    ]
}
````

Set an environment variable named LAMBDA_ROLE_ARN for use in the next step.

````console
export LAMBDA_ROLE_ARN=arn:aws:iam::nnnnnnnnnnnn:role/sls-hello-world-us-east-1-lambdaRole
````

### Deploy the Application

Use the serverless command to deploy your stack.

````console
sls deploy
````

Once deployed, you can invoke the function from the command line:

````console
$ sls invoke -f hello -l
{
    "statusCode": 200,
    "body": "{\"message\":\"Go Serverless v1.0! Your function executed successfully!\",\"input\":{}}"
}
--------------------------------------------------------------------
START RequestId: 3be1a265-8072-11e8-9fe2-ef9ea1ccc704 Version: $LATEST
END RequestId: 3be1a265-8072-11e8-9fe2-ef9ea1ccc704
REPORT RequestId: 3be1a265-8072-11e8-9fe2-ef9ea1ccc704	Duration: 1.86 ms	Billed Duration: 100 ms 	Memory Size: 1024 MB	Max Memory Used: 47 MB	
````
