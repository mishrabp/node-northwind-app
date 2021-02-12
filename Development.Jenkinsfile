node {
    //def mvnHome
    stage('Preparation') { // for display purposes
        // Get some code from a GitHub repository
        git branch: 'development', url: 'https://github.com/mishrabp/node-northwind-app.git'
        
    }
    stage('Build') {
        // npm build
        sh 'npm install'
        sh 'npm run build'
    }
    stage('SonarQube analysis') {
        sh 'npm audit fix'
        def scannerHome = tool 'SonarQube Scanner'; //It finds the SonarQube Scanner version from Jenkins >> Global Tool Configuration
        withSonarQubeEnv('SonarQube Server') { // It reads the authentication from Jenkins >> Configuration Systems
            sh "${scannerHome}/bin/sonar-scanner"
        }
    }
    stage("Quality Gate") {
        steps {
            timeout(time: 1, unit: 'HOURS') {
                // Parameter indicates whether to set pipeline to UNSTABLE if Quality Gate fails
                // true = set pipeline to UNSTABLE, false = don't
                waitForQualityGate abortPipeline: true
            }
        }
    }
    stage('Perform Test') {
        //
    }
    stage('Publish to Artifactory') {
        //jfrog //npm-publish //--build-name=node-northwind-app --build-number=1
        //sh 'npm publish'
    }
}
