#!/bin/bash

set -xeo pipefail

hexo generate

cd ../jogo
yarn install && yarn build

PROTOTIPO_PATH=./institucional/public/prototipo
cd ..
mkdir -p $PROTOTIPO_PATH
cp jogo/dist/* $PROTOTIPO_PATH

cat $PROTOTIPO_PATH/index.html | sed -E 's/(bundle\.js)/\/prototipo\/\1/' > $PROTOTIPO_PATH/index.html
