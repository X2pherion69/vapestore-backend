node {
  stage('SCM') {
    checkout scm
  }
  stage('SonarQube Analysis') {
    def scannerHome = tool 'vapestore-backend'
    withSonarQubeEnv() {
      sh "${scannerHome}/bin/sonar-scanner"
    }
  }
  stages('Testing unit tests') {
    stage('Install dependencies') {
      steps {
        sh 'yarn install'
      }
    }
    stage('Run test') {
      steps {
        sh 'yarn test'
      }
    }
  }
  stages('Build and deliver') {
    stage('Build image') {
      steps {
        sh 'docker compose build'
      }
    }
    stage('Push image to Dockerhub') {
      steps {
        sh 'docker login -u -p'
      }
    }
    stage('Run test') {
      steps {
        sh 'yarn test'
      }
    }
  }
}
