pipeline {
  agent any

  tools {
    nodejs 'Nodejs'
  }

  parameters {
    string(defaultValue: "vapestore-backend", description: "", name: "REPOSITORY_TOOL_NAME")
  }

  environment {
    DOCKERHUB_CREDENTIALS = credentials('dockerhub')
  }

  stages {
    stage('Sonarqube Analysis') {
      steps {
        build job: "SonarPipeline", wait: yes, parameters: [string(name: "TOOL_REPO_NAME", value: String.valueOf(REPOSITORY_TOOL_NAME))]
      }
    }

    stage('Install dependencies') {
      steps {
        sh 'yarn install'
      }
    }

    stage('Run tests') {
      steps {
        sh 'yarn test'
        echo 'Test done!'
      }
    }

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
