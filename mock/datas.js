module.exports = {
    login: {
        format: (method, params, result, { body }) => {
            return Object({}, result.data, params)
        },
        post: {
            data: {
                account: 'kscript2018',
                appKey: '45c6af3c98409b18a84451215d0bdd6e',
                token: '0f2ce291c76ecfc032e3432142f06fac'
            }
        }
    },
};