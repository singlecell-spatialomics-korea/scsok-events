#!/bin/bash

if [[ $DEBUG == "True" ]]; then
    echo "Running frontend debug server..."
    npm run dev -- --host --port 3000
else
    echo "Running frontend production server..."
    export NODE_ENV=production
    node build
fi