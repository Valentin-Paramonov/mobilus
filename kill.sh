#!/bin/bash

[ ! -e .pid ] && echo "Not running?" && exit 1
kill $(cat .pid)
rm .pid

