module.exports = {
    login: {
        format: (method, params, result, { body }) => {
          Object.assign(result.data, params);
          // 同步
          return result
          // 异步
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve(result)
            }, 1e4)
          })
        },
        post: {
          message: "登录成功!",
          data: {}
        }
    },
    test: {
      relay: 'http://597.test/index/test',
      format: (method, params, result, { body }) => {
        console.log(method, params, result)
        // Object.assign(result.data, params);
        // // 同步
        // return result
        // // 异步
        // return new Promise((resolve, reject) => {
        //   setTimeout(() => {
        //     resolve(result)
        //   }, 1e4)
        // })
      },
      post: {
        message: "登录成功!",
        data: {}
      }
  },
};