export function unauthPage (ctx) {
    
    return new Promise(resolve => {
        const redir = function () {
            return {
                
                redirect: {
                    permanent: false,
                    destination: '/posts'
                }
            }
        }
        return resolve(redir())
    })
}


export function authPage (ctx) {
    
    return new Promise(resolve => {
        const redir = function () {
            return {
                
                redirect: {
                    permanent: false,
                    destination: '/auth/login'
                }
            }
        }
        return resolve(redir())
    })
}

