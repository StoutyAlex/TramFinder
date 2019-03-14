#!/bin/sh

set -e

ENVIRONMENT=""
FUNCTION_NAME=""

INT_FUNCTION_NAME="int-alexaTramFinder"
LIVE_FUNCTION_NAME="alexaTramFinder"

while getopts ":e:" opt; do
    case "$opt" in
    e)
        ENVIRONMENT=${OPTARG}
        ;;
    esac
done

deploy() {
    echo "Creating deployment for ${ENVIRONMENT} to ${FUNCTION_NAME} lambda..."
    aws configure set aws_access_key_id $AWS_ACCESS_KEY_ID
    aws configure set aws_secret_access_key $AWS_SECRET_ACCESS_KEY
    aws configure set region eu-west-1

    aws s3 rm s3://temp.bucket.tram-finder-lambda --recursive

    aws s3 cp function.zip s3://temp.bucket.tram-finder-lambda

    aws lambda update-function-code --function-name $FUNCTION_NAME --s3-bucket temp.bucket.tram-finder-lambda --s3-key function.zip

}

case "${ENVIRONMENT}" in
int)
    echo "Int environment deploy"
    FUNCTION_NAME=$INT_FUNCTION_NAME
    deploy
    ;;
live)
    echo "Live environment deploy"
    FUNCTION_NAME=$LIVE_FUNCTION_NAME
    deploy
    ;;
esac
