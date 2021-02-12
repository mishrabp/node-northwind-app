node {
    
    def buildFileName =  "node-northwind-app-${BUILD_NUMBER}.tar.gz"
    
    stage('Preparation') { // for display purposes
        
        sh 'rm -rf node-northwind*.tar.gz'
        
        // Get some code from a GitHub repository
        git branch: 'main', url: 'https://github.com/mishrabp/node-northwind-app.git'
        
    }
    stage('Build') {
        sh 'npm install'
        sh 'npm run build'
        sh 'tar czf ' + buildFileName + ' config dal middleware mvc routes public startup utility app.js server.js manifest.json setprodenv.sh LICENSE'
    }
    stage('SonarQube Code Analysis') {
        sh 'npm audit fix'
        def scannerHome = tool 'SonarQube Scanner'; //It finds the SonarQube Scanner version from Jenkins >> Global Tool Configuration
        withSonarQubeEnv('SonarQube Server') { // It reads the authentication from Jenkins >> Configuration Systems
            sh "${scannerHome}/bin/sonar-scanner"
        }
    }
    stage("Quality Gate") {
        //steps {
        //    timeout(time: 1, unit: 'HOURS') {
                // Parameter indicates whether to set pipeline to UNSTABLE if Quality Gate fails
                // true = set pipeline to UNSTABLE, false = don't
         //       waitForQualityGate abortPipeline: true
         //   }
        //}
    }
    stage('Perform Test') {
        //
    }
    stage('Publish Build to jFrog Artifactory') {
        //sh 'npm publish'
        rtUpload (
            serverId: "jfrog-artifactory-server", // Obtain an Artifactory server instance, defined in Jenkins --> Manage:
            spec: """{
                "files": [
                        {
                            "pattern": "node-northwind-app*.tar.gz",
                            "target": "npm-local/node-northwind-app-production-ci-pipeline/"
                        }
                    ]
                }"""
        )
    }
    stage ('Publish Build Info to jFrog Artifactory') {
        rtPublishBuildInfo (
            serverId: "jfrog-artifactory-server"
        )
    }
}
