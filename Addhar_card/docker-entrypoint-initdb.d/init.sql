#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    ALTER USER postgres WITH CREATEDB CREATEROLE SUPERUSER;
    CREATE DATABASE aadhaar_db;
    GRANT ALL PRIVILEGES ON DATABASE aadhaar_db TO postgres;
EOSQL
