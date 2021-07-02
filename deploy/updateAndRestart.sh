# devops stuff here, students ignore
# check if the deploy directory is already a git repository, if so then pull
# to latest code, if not then clone the repository through ssh.
# then build the dependencies and run the application.
# make sure to change the DEPLOY_DIR variable to where you want to deploy the
# application to, and change the app-name at the bottom of the file.
#!/bin/bash

# any future command that fails will exit the script
set -e

DEPLOY_DIR="location/to/api"
GIT_URL='GIT SSH URL'
RESTART_ARGS=

echo $DEPLOY_DIR
# Pull latest code
if [[ -e $DEPLOY_DIR ]]; then
  cd $DEPLOY_DIR
  git pull
else
  git clone $GIT_URL $DEPLOY_DIR
  cd $DEPLOY_DIR
fi

# Install dependencies for backed
pwd
npm ci --production
npm prune --production

# Run the backend
pm2 start ./config/pm2.config.js --name="app-name" --env development
