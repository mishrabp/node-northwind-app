mkdir azagent;cd azagent;curl -fkSL -o vstsagent.tar.gz https://vstsagentpackage.azureedge.net/agent/2.188.4/vsts-agent-linux-x64-2.188.4.tar.gz;tar -zxvf vstsagent.tar.gz; if [ -x "$(command -v systemctl)" ]; then ./config.sh --environment --environmentname "Development" --acceptteeeula --agent $HOSTNAME --url https://dev.azure.com/bpm-2021/ --work _work --projectname 'node-northwind-app-demo' --auth PAT --token led673yl2pifrtm5ygalzte4h52z24c7xzhxxauk3ptal7ossyza --runasservice; sudo ./svc.sh install; sudo ./svc.sh start; else ./config.sh --environment --environmentname "Development" --acceptteeeula --agent $HOSTNAME --url https://dev.azure.com/bpm-2021/ --work _work --projectname 'node-northwind-app-demo' --auth PAT --token led673yl2pifrtm5ygalzte4h52z24c7xzhxxauk3ptal7ossyza; ./run.sh; fi