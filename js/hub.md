I have a hub machine running in this url "http://63.25.163.142:4444" and i have a node machine, wich is a different machine from the hub one running in this ip address "http://10.119.35.228:50423"
my test cases are in my local machine (http://63.25.163.142:4444), i want to run them in the node machine using this command: SELENIUM_REMOTE_URL="http://10.119.35.228:50423" npx playwright test test_user_less_than_5k_pages.spec.js
but when i try running it, it gives me this error: Error: browserType.launch: Error connecting to selenium at ip/wd/hub/session: session not created

how can i solve this issue?

now im getting this error: SyntaxError: browserType: Unexpected token '<', "<!DOCTYPE "... is not a valid JSON

java -jar selenium-server-standalone-<version>.jar -role node -hub http://<hub-ip>:<hub-port>/grid/register -browser "browserName=playwright,playwrightUrl=https://path/to/playwright" -Dhttp.proxyHost=<proxy-host> -Dhttp.proxyPort=<proxy-port> -Dhttps.proxyHost=<proxy-host> -Dhttps.proxyPort=<proxy-port>
