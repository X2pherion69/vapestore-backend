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
      emailext to: 'huy.trannguyen@tpptechnology.com',
            subject: "Build Result:${currentBuild.currentResult} Job:${env.JOB_NAME}",
            body: '${SCRIPT, template="template-for-pipeline.template"}'
        }
        success {
      emailext to: 'huy.trannguyen@tpptechnology.com',
            subject: "Build Result:${currentBuild.currentResult} Job:${env.JOB_NAME}",
            body: '${SCRIPT, template="template-for-pipeline.template"}'
        }
    }
    stages {
    // stage('Sonarqube Analysis') {
    //   steps {
    //     script {
    //       def scannerHome = tool 'vapestore-backend'
    //       withSonarQubeEnv() {
    //         sh "${scannerHome}/bin/sonar-scanner"
    //       }
    //     }
    //   }
    // }

    //     stage('Quality Gate') {
    //   steps {
    //     timeout(time: 10, unit: 'MINUTES') { waitForQualityGate abortPipeline: true }
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
    //     echo 'Test done =================================!'
    //   }
    //     }

        stage('Build image backend services') {
      steps {
        script {
            def customImage = docker.build('x2pher69/vapestore_backend:latest')
            customImage.push()
            echo 'Build complete =================================!'
        }
      }
        }

        stage('Deploy to production') {
      steps {
        sshagent(credentials:['385f3aa3-e8c6-4336-9b68-50528da00149']) {
          sh 'ssh -o StrictHostKeyChecking=no -l ubuntu 54.153.156.197 uname -a'
          sh 'ssh -o StrictHostKeyChecking=no -l ubuntu 54.153.156.197 sudo docker compose down'
          sh 'ssh -o StrictHostKeyChecking=no -l ubuntu 54.153.156.197 sudo echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
          sh 'ssh -o StrictHostKeyChecking=no -l ubuntu 54.153.156.197 sudo docker run --pull=always --rm -v /app -v /app/node_modules --expose 4000 --name vapestore_backend --network=vape-service -d x2pher69/vapestore_backend:latest'
          sh 'ssh -o StrictHostKeyChecking=no -l ubuntu 54.153.156.197 sudo docker compose up -d'
          echo 'Sucessfully deploy to production =================================!'
        }
      }
        }
    }
}
