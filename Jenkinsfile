pipeline {
  agent any

  tools {
    nodejs 'Nodejs'
  }

  environment {
    DOCKERHUB_CREDENTIALS = credentials('dockerhub')
  }

  stages {
    stage('Sonarqube Analysis') {
      steps {
        script {
          def scannerHome = tool 'vapestore-backend'
          withSonarQubeEnv() {
            sh "${scannerHome}/bin/sonar-scanner"
          }
        }
      }
    }

    stage('Install dependencies') {
      steps {
        sh 'yarn install'
      }
    }

    // stage('Run tests') {
    //   steps {
    //     sh 'yarn test'
    //     echo 'Test done!'
    //   }
    // }

    stage('Build image backend services') {
      steps {
        sh 'docker compose build'
        echo 'Build complete!'
      }
    }

    stage('Login to Dockerhub') {
      steps {
        sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
        echo 'Login sucessfully!'
      }
    }

    stage('Push image to Dockerhub') {
      steps {
        sh 'docker push x2pher69/vapestore_backend:latest'
        echo 'Push complete!'
      }
    }

    stage('Logout dockerhub') {
      steps {
        sh 'docker logout'
        echo 'Log docker out complete!'
      }
    }

    stage('Deployment') {
      steps {
        sh 'docker compose -f docker-compose.production.yml up -d'
        echo 'Deploy success'
      }
    }
  }
}
