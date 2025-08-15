#!/bin/bash

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo "PostgreSQL is not installed. Please install it first."
    exit 1
fi

# Create database and user
psql postgres <<EOF
CREATE DATABASE aadhaar_portal;
CREATE USER postgres WITH ENCRYPTED PASSWORD 'postgres';
GRANT ALL PRIVILEGES ON DATABASE aadhaar_portal TO postgres;
\q
EOF

if [ $? -eq 0 ]; then
    echo "Database created successfully!"
    echo "Now run:"
    echo "1. npx prisma generate"
    echo "2. npx prisma db push"
else
    echo "Error creating database. Please check the error messages above."
fi
