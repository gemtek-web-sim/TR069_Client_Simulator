#!/bin/bash

# Take timestamp with day format
LOG_FILE="log/"$(date +"%d_%m_%y")".txt"

# Check if log directory exists, if not create it
if [ ! -d "$(dirname "$LOG_FILE")" ]; then
    mkdir -p "$(dirname "$LOG_FILE")"
fi

# Check if log file exists, if not create it
if [ ! -f "$LOG_FILE" ]; then
    touch "$LOG_FILE"
fi

# Start the server and redirect output to log file
node server.js >> "$LOG_FILE"
