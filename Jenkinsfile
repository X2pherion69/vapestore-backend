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

    ///     stage('Sonarqube Analysis') {
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

    stages {
        stage('Deploy to production') {
      steps {
        sshagent(credentials:['385f3aa3-e8c6-4336-9b68-50528da00149']) {
          sh 'ssh -o StrictHostKeyChecking=no -l ubuntu 54.153.156.197 uname -a'
          sh 'ssh -o StrictHostKeyChecking=no -l ubuntu 54.153.156.197 sudo docker-compose down'
          sh 'ssh -o StrictHostKeyChecking=no -l ubuntu 54.153.156.197 echo $DOCKERHUB_CREDENTIALS_PSW | sudo docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
          sh 'ssh -o StrictHostKeyChecking=no -l ubuntu 54.153.156.197 sudo docker-compose up -d'
          sh 'ssh -o StrictHostKeyChecking=no -l ubuntu 54.153.156.197 sudo docker logout'
          echo 'Sucessfully deploy to production'
        }
      }
        }
    }
}
