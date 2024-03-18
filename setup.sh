#!/bin/bash

# Function to rename the file ".env.sample" to ".env"
rename_env_file() {
    # Check if the file ".env.sample" exists
    if [ -e ".env.sample" ]; then
        # Rename ".env.sample" to ".env"
        mv .env.sample .env
        echo "File '.env.sample' renamed to '.env'"
    else
        echo "File '.env.sample' not found."
    fi
}

cd auth-service
rename_env_file

cd ../collaboration-service
rename_env_file

cd ../communication-service
rename_env_file

cd ../matching-service
rename_env_file

cd ../question-service
rename_env_file

cd ../user-service
rename_env_file

# Function to find and kill processes listening on specific ports
kill_process_on_port() {
    local port=$1
    local pid=$(lsof -ti:$port)  # Get PID of process listening on the port
    if [ -n "$pid" ]; then
        echo "Killing process on port $port (PID: $pid)..."
        kill -9 $pid  # Kill the process
    else
        echo "No process found on port $port."
    fi
}

kill_process_on_port 8000
kill_process_on_port 8001
kill_process_on_port 8002
kill_process_on_port 8003
kill_process_on_port 8004
kill_process_on_port 8005

