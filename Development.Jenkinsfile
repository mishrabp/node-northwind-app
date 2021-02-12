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
    stage('Code Quality Scan') {
        sh 'npm audit fix'
        // npm build
        //tool name: 'sonar', type: 'hudson.plugins.sonar.SonarRunnerInstallation'
        //def scannerhome = tool 'SonarScanner'
       // withSonarQubeEnv('SonarServer') {
        //    sh """${scannerhome}/bin/sonar-runner -D sonar.login = admin -D sonar.password = admin"""
       // }
    }
    stage('Perform Test') {
        //
    }
    stage('Publish to Artifactory') {
        //jfrog //npm-publish //--build-name=node-northwind-app --build-number=1
        //sh 'npm publish'
    }
}
