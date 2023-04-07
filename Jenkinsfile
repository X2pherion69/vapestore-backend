pipeline {
  agent any

  tools {
    nodejs 'Nodejs'
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

    stage('Login to Dockerhub') {
      steps {
        sh 'docker login -u x2pher69 --password-stdin'
        echo 'Login sucessfully!'
      }
    }

    stage('Build image backend services') {
      steps {
        sh 'docker compose build'
        echo 'Build complete!'
      }
    }

    stage('Push image to Dockerhub') {
      steps {
        sh 'docker push'
        echo 'Push complete!'
      }
    }

    stage('Deployment') {
      steps {
        sh 'docker compose -f docker-compose.production.yml up -d'
        echo 'Deploy success!'
      }
    }

    stage('All settled') {
      steps {
        sh 'docker logout'
        echo 'Log docker out complete!'
      }
    }
  }
}
