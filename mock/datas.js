module.exports = {
    login: {
        format: (method, params, result, { body }) => {
          Object.assign(result.data, params);
          // 同步
          return result
          // 异步
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              // reject(result)
              resolve(result)
            }, 1e4)
          })
        },
        post: {
            data: {},
            message: "登录成功!"
        }
    },
};