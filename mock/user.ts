import {MockMethod} from 'vite-plugin-mock'

const users = [
    {
        name: 'admin', password: '123456', token: 'admin', info: {
            name: '系统管理员'
        }
    },
    {
        name: 'user', password: '123456', token: 'user', info: {
            name: '普通用户'
        }
    },
    {
        name: 'merchant', password: '123456', token: 'merchant', info: {
            name: '商家'
        }
    },
    {
        name: 'courier', password: '123456', token: 'courier', info: {
            name: '快递员'
        }
    },
    {
        name: 'company', password: '123456', token: 'company', info: {
            name: '快递公司'
        }
    },
]
export default [
    {
        url: `/mock/user/login`,
        method: 'post',
        response: ({body}) => {
            const user = users.find(user => {
                return body.name === user.name && body.password === user.password
            })
            if (user) {
                return {
                    code: 200,
                    data: {
                        token: user.token,
                    },
                };
            } else {
                return {
                    code: 401,
                    data: {},
                    msg: '用户名或密码错误'
                };
            }

        }
    },
    {
        url: `/mock/user/info`,
        method: 'post',
        response: ({body}) => {
            const {token} = body
            const info = users.find(user => {
                return user.token === token
            }).info
            if (info) {
                return {
                    code: 200,
                    data: {
                        info: info
                    },
                };
            } else {
                return {
                    code: 403,
                    data: {},
                    msg: '无访问权限'
                };
            }

        }
    },
    {
        url: `/mock/user/out`,
        method: 'post',
        response: () => {
            return {
                code: 200,
                data: {},
                msg: 'success'
            };
        }
    },
    {
        url: `/mock/user/passwordChange`,
        method: 'post',
        response: () => {
            return {
                code: 200,
                data: {},
                msg: 'success'
            };
        }
    },
] as MockMethod[]
