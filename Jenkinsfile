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
    stage('Results') {
        //
    }
    stage('Deploy') {
        //
    }
}
