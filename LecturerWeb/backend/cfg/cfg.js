module.exports = {
    db: {
        // url: 'mongodb://localhost:27017',
        // url : "mongodb://xxx.com:27170/xxx"
    },
    web: {
      host: 'localhost:3000' // 자신의 서버 ip와 웹 포트 입력
      cors: true,
      secret_key : 'veryhardultrakey',
      // 추후 http, https, port등 지정
    }
};
