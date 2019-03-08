# Setup directories
mkdir ./build
rm -rf ./build/*
mkdir ./build/tramFinderLambda

# Copy files
cp -rf ./src ./build/tramFinderLambda
cp ./package.json ./build/tramFinderLambda
cp ./index.js ./build/tramFinderLambda

# Install packages
cd ./build/tramFinderLambda
yarn install
rm -rf yarn.lock
cd ..

# Zip into package
zip -r ./build.zip ./tramFinderLambda/* -x "*.DS_Store"

# Finish
rm -rf ./tramFinderLambda