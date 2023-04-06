
# 백엔드
npm install koa 
npm install --dev eslint
npm run eslint --init
npm install eslint-config-prettier
npm install --dev nodemon
npm install koa-router
npm install koa-bodyparser
npm install mongodb
npm services start mongodb  실행
npm install mongoose dotenv
npm install joi
npm install jsonwebtoken


# 프론트
npm install  react-router-dom
npm install  styled-components
npm install  redux react-redux redux-actions immer redux-devtools-extension
npm install axios redux-saga
npm install quill
npm install qs
npm install sanitize-html
npm install react-helmet-async
npm install koa-static
npm install node-sass
npm install sass-loader
npm install react-infinite-scroll-component

npm install  query-string


# react
react
 sudo service mongod start
 sudo service mongod status
 sudo systemctl start nginx
 sudo systemctl status nginx
 sudo chmod 777
node -v  버전 16.18.0
npm -v 버전  9.5.1

node 버전 다운그레이드 방법
https://ahn3330.tistory.com/45 사이트 참조

https://github.com/coreybutler/nvm-windows/releases
사이트 접속후 nvm 설치

node -v // 노드 현재버전 확인
nvm install <노드 버전> // 변경할 버전을 설치
nvm use <노드 버전> // 설치한 버전으로 변경
node -v // 변경된 노드 버전 확인

npm 버전 다운그레이드 방법
windows powershell 관리자실행
get-ExecutionPolicy 명령어입력
결과값이 RemoteSigned 가 아닌경우 
Set-ExecutionPolicy RemoteSigned 명령어 입력 후 나오는메세지에서 Y 
npm install -g npm@<버전>