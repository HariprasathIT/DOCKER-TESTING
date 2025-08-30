pipeline {
  agent any

  environment {
    APP_DIR = 'backend'
  }

  // If you want polling instead of webhook, replace githubPush() with:
  // triggers { pollSCM('H/2 * * * *') }
  triggers { githubPush() }

  options { skipDefaultCheckout() }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install & Test (optional)') {
      steps {
        dir("${APP_DIR}") {
          // optional: install & test (you can skip in production pipeline)
          sh '''
            if [ -f package.json ]; then
              npm ci --silent || true
              npm test || echo "tests skipped/failed"
            fi
          '''
        }
      }
    }

    stage('Build & Deploy (docker-compose)') {
      steps {
        dir("${APP_DIR}") {
          sh '''
            # use docker compose (new) if available, else fallback to docker-compose
            if docker compose version >/dev/null 2>&1; then
              DC="docker compose"
            else
              DC="docker-compose"
            fi

            # Build & recreate the container using the local Dockerfile
            $DC up -d --build --remove-orphans
          '''
        }
      }
    }
  }

  post {
    success {
      echo "✅ Build & deploy finished."
    }
    failure {
      echo "❌ Build or deploy failed - check logs."
    }
    always {
      cleanWs()
    }
  }
}
