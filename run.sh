#!/bin/bash

[ -e .pid ] && echo "Already running?" && exit 1
node mobilus.js 2>&1 >>server.log | tee -a server.log &
echo $! > .pid

