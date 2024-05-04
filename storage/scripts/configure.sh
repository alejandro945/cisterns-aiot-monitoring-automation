#!/bin/bash
##
# Script to connect to the first Mongod instance running in a container of the
# Kubernetes StatefulSet, via the Mongo Shell, to initalise a MongoDB Replica
# Set and create a MongoDB admin user.
##

# Check for password argument
if [[ $# -eq 0 ]] ; then
    echo 'You must provide one argument for the password of the "main_admin" user to be created'
    echo '  Usage:  configure_repset_auth.sh MyPa55wd123'
    echo
    exit 1
fi

# Initiate replica set configuration
echo "Configuring the MongoDB Replica Set"
kubectl exec mongod-0 -n apps -c mongod-container -- mongosh --eval 'rs.initiate();'

# Wait a bit until the replica set should have a primary ready
echo "Waiting for the Replica Set to initialise..."
sleep 30
kubectl exec mongod-0 -n apps -c mongod-container -- mongosh --eval 'rs.status();'

# Create the admin user (this will automatically disable the localhost exception)
echo "Creating user: 'main_admin'"
kubectl exec mongod-0 -n apps -c mongod-container -- mongosh --eval 'db.getSiblingDB("admin").createUser({user:"main_admin",pwd:"'"${1}"'",roles:[{role:"root",db:"admin"}]});'

echo

kubectl exec mongod-0 -n apps -c mongod-container -- mongosh -u main_admin -p ${1} --eval 'rs.add("mongod-0.mongodb-service.apps.svc.cluster.local:27017");'

