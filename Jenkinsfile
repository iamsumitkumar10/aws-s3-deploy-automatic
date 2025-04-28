pipeline {
    agent any
    tools {
      nodejs 'NodeJS'
    }
    environment {
        NODE_VERSION = "18"
        AWS_DEFAULT_REGION = "ap-south-1"    // e.g., ap-south-1
        S3_BUCKET = "demo-app-one-sks"        // <-- S3 Bucket name
    }
    stages {

        stage('Setup NodeJs') {
            steps {
                sh "npm install"
            }
        }

        stage('Build Project') {
            steps {
                script {
                    echo "Building project..."
                    sh "npm run build"
                }
            }
        }

        stage('Upload Build Folder to S3') {
            steps {
                script {
                    echo "Uploading build folder to S3..."
                    withCredentials([usernamePassword(credentialsId: 'aws-access-credentials', usernameVariable: 'AWS_ACCESS_KEY_ID', passwordVariable: 'AWS_SECRET_ACCESS_KEY')]) {
                        sh """
                        aws s3 sync dist/ s3://${S3_BUCKET}/ --delete
                        """
                    }
                    echo "✅ Build folder uploaded successfully."
                }
            }
        }

    }
}
