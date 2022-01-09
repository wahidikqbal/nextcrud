import nookies from "next-cookies"

export function unauthPage (ctx) {
    
    return new Promise(resolve => {
        const redirToPosts = function () {
            return {
                
                redirect: {
                    permanent: false,
                    destination: '/posts'
                }
            }
        }
        return resolve(redirToPosts())
    })
}


export function authPage (ctx) {
    
    return new Promise(resolve => {
        const redirToLogin = function () {
            return {
                
                redirect: {
                    permanent: false,
                    destination: '/auth/login'
                }
            }
        }
        return resolve(redirToLogin())
    })
}

