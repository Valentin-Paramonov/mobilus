#!/bin/bash

[ -e .pid ] && echo "Already running?" && exit 1
node server.js &>> server.log &
echo $! > .pid

