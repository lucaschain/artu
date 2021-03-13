#!/bin/bash

set -xeo pipefail

SCRIPT_PATH=$(cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd)
cd $SCRIPT_PATH/..

hexo generate

cd ../jogo
yarn install && yarn build

cd ..
PROTOTIPO_PATH=./institucional/public/prototipo
mkdir -p $PROTOTIPO_PATH
cp jogo/dist/bundle.js $PROTOTIPO_PATH/bundle.js
cp jogo/dist/index.html $PROTOTIPO_PATH/pre.index.html

cat $PROTOTIPO_PATH/pre.index.html | sed -E 's/(bundle\.js)/\/prototipo\/\1/' > $PROTOTIPO_PATH/index.html

rm $PROTOTIPO_PATH/pre.index.html
