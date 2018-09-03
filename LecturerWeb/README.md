아래의 것들을 자신의 환경에 맞게 변경해주어야 동작함 

frontend : Vuejs(vue-cli)
1. src/main.js에 
if (process.env.NODE_ENV === 'development') cfg.path.api = 'http://localhost:3000/api/' 이부분 변경

2. static/cfg.js에 
api: 'http://localhost:3000/api/' 이부분 변경

3. npm run build로 dist폴더 갱신(backend로만 구동가능하도록 배포)


backend : nodejs(express)
1. cfg/cfg.js에
host: 'localhost:3000' 이부분 변경

2. cfg/db_info.js에
local: { // 자신의 db정보를 입력해야함
      host: 'localhost',
      port: '3306',
      user: 'root',
      password: '',
      database: ''
    },
위의 부분을 자신의 db경로로 변경

3. nodemon 또는 node bin/www로 실행

4. 자신의 서버 ip:port로 이동