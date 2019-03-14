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
  AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID} AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY} aws lambda update-function-code --function-name $FUNCTION_NAME --zip-file fileb://function.zip --region eu-west-1
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
