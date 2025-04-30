pipeline {
    agent any
    tools {
      nodejs 'NodeJS'
    }
    environment {
        NODE_VERSION = "18"
        AWS_DEFAULT_REGION = "ap-south-1"    // e.g., ap-south-1
        S3_BUCKET = "demo-app-one-sks"       // <-- S3 Bucket name
    }
    stages {
        // New Clean Stage
        stage('Clean Workspace') {
            steps {
                script {
                    echo "🧹 Cleaning previous build artifacts..."
                    sh "rm -rf dist"  // Only delete build output
                    sh "npm cache clean --force"
                }
            }
        }

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
    post {
        success {
            echo '✅ Pipeline completed successfully.'
            emailext(
                subject: 'this mail from jenkins demo-app-one build id ${BUILD_ID}',
                body: '''Build is successfully.
Build URL is : ${BUILD_URL}
                ''',
                from: 'sumitkumar703327@gmail.com',
                to: 'work.sumit10@gmail.com'
            )
        }
        failure {
            echo '❌ Pipeline failed. Check the logs for details.'
            emailext(
                subject: 'this mail from jenkins demo-app-one build id ${BUILD_ID}',
                body: '''Build is failed. 
Build URL is : ${BUILD_URL}
                ''',
                from: 'sumitkumar703327@gmail.com',
                to: 'work.sumit10@gmail.com'
            )
        }
        always {
            echo '📋 Pipeline execution finished.'
        }
    }
}


