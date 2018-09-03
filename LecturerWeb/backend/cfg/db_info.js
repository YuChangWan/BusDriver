module.exports = (function () {
  return {
    local: { // 자신의 db정보를 입력해야함
      host: 'localhost',
      port: '3306',
      user: 'root',
      password: '',
      database: ''
    },
    real: { // real server db info
      host: '',
      port: '',
      user: '',
      password: '!',
      database: ''
    },
    dev: { // dev server db info
      host: '',
      port: '',
      user: '',
      password: '',
      database: ''
    }
  }
})();
