#!/bin/sh

set -e

ENVIRONMENT="null"

while getopts ":e:" opt; do
    case "$opt" in
    e)
        ENVIRONMENT=${OPTARG}
        ;;
    esac
done

echo "Building release for ${ENVIRONMENT} environment..."

zip -r function.zip index.js node_modules src package.json

echo "Build finished."
