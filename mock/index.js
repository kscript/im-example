const KsMock = require("ks-mock");
const datas = require('./datas.js');
new KsMock({
    mockData: datas,
    headConfig: null,
    crossDomain: true,
    port: 3030,
    loginUrl: 'login',
    https: {
      key: '',
      cert: ''
    }
}).server();