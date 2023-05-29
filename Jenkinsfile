pipeline {
    agent any

    tools {
        nodejs 'Nodejs'
    }

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub')
    }

    post {
        failure {
      emailext to: 'trannguyenduchuy96@gmail.com',
            subject: "jenkins build:${currentBuild.currentResult}: ${env.JOB_NAME}",
            body: "${currentBuild.currentResult}: Job ${env.JOB_NAME}\nMore Info can be found here: ${env.BUILD_URL}"
        }
        success {
      emailext to: 'trannguyenduchuy96@gmail.com',
            subject: "jenkins build:${currentBuild.currentResult}: ${env.JOB_NAME}",
            body: "${currentBuild.currentResult}: Job ${env.JOB_NAME}\nMore Info can be found here: ${env.BUILD_URL}"
        }
    }

    stages {
        stage('Deploy to production') {
      steps {
        sshagent(credentials:['385f3aa3-e8c6-4336-9b68-50528da00149']) {
          sh 'ssh -o StrictHostKeyChecking=no -l ubuntu 3.24.239.158 uname -a'
          sh 'ssh -o StrictHostKeyChecking=no -l ubuntu 3.24.239.158 cd vapestore-backend'
          sh 'ssh -o StrictHostKeyChecking=no -l ubuntu 3.24.239.158 sudo docker compose -f docker-compose.production.yml up -d'
          echo 'connect sucessfully to production'
        }
      }
        }

    //     stage('Sonarqube Analysis') {
    //   steps {
    //     script {
    //       def scannerHome = tool 'vapestore-backend'
    //       withSonarQubeEnv() {
    //         sh "${scannerHome}/bin/sonar-scanner"
    //       }
    //     }
    //   }
    //     }

    //     stage('Quality Gate') {
    //   steps {
    //     timeout(time: 1, unit: 'MINUTES') { waitForQualityGate abortPipeline: true }
    //   }
    //     }

    //     stage('Install dependencies') {
    //   steps {
    //     sh 'yarn install'
    //   }
    //     }

    //     stage('Run test') {
    //   steps {
    //     sh 'yarn test'
    //     echo 'Test done!'
    //   }
    //     }

    //     stage('Build image backend services') {
    //   steps {
    //     sh 'docker compose build'
    //     echo 'Build complete!'
    //   }
    //     }

    //     stage('Login to Dockerhub') {
    //   steps {
    //     sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
    //     echo 'Login sucessfully!'
    //   }
    //     }

    //     stage('Push image to Dockerhub') {
    //   steps {
    //     sh 'docker push x2pher69/vapestore_backend:latest'
    //     echo 'Push complete!'
    //   }
    //     }

    //     stage('Logout dockerhub') {
    //   steps {
    //     sh 'docker logout'
    //     echo 'Log docker out complete!'
    //   }
    //     }

    //     stage('Deployment') {
    //   steps {
    //     sh 'docker compose -f docker-compose.production.yml up -d'
    //     echo 'Deploy success'
    //   }
    //     }
    }
}
