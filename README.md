
🚀 Project Deployment Workflow
Code changes are made and pushed to the Git repository.
Jenkins automatically fetches the latest code from Git.
Using Jenkins scripts, the project is compiled and a production build is generated.
The build package is then deployed to an AWS S3 bucket.
Once deployment is successful, an email notification is sent to confirm the deployment.