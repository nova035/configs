#!/usr/bin/env bash

case $CIRCLE_NODE_INDEX in
0)
    grunt test:unit
    ;;
esac
