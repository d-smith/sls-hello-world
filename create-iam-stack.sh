#!/bin/bash

if [ "$#" -ne 4 ]; then
    echo "Usage: create-stack <stack name> <stage> <service> <function>"
    exit 1
fi

aws cloudformation create-stack \
--stack-name $1 \
--template-body file://sls-iam.yml \
--parameters ParameterKey=StageName,ParameterValue=$2 \
ParameterKey=Service,ParameterValue=$3 \
ParameterKey=Function,ParameterValue=$4 \
--capabilities CAPABILITY_NAMED_IAM