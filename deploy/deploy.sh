# devops stuff here, students ignore
# this file will go through the list of servers set on gitlab
# and initialize the project inside of there by calling updateAndRestart.sh
# and sending the server address as a parameter.
#!/bin/bash

# any future command that fails will exit the script
set -e

# Lets write the public key of our aws instance
eval $(ssh-agent -s)

# disable the host key checking.
# ./deploy/disableHostKeyChecking.sh

# we have already setup the DEPLOY_SERVERS in our gitlab settings which is a
# comma seperated values of ip addresses.
DEPLOY_SERVERS=$DEPLOY_SERVERS

ALL_SERVERS=(${DEPLOY_SERVERS//,/ })
echo "ALL_SERVERS ${ALL_SERVERS}"

# Once inside the server, run updateAndRestart.sh
for server in "${ALL_SERVERS[@]}"
do
  echo "deploying to ${server}"
  ssh autodeploy@${server} 'bash' < ./deploy/updateAndRestart.sh
done
