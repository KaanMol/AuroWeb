declare module NodeJS {
    interface Global {
        _core: {
            handlers: {
                auth: {
                    getFullUser: (userObject: {}) => {},
                    getUser: (userObject: {}) => {},
                    createUser: (requestBody: {}) => {},
                },
                connection: {
                    get_connection: (user1: string, user2: string) => {},  

                    getConnection: (user1: {}, user2: {}) => {},
                    createRequest: (request: {}) => {},
                    getPendingRequests: (request: {}) => {},
                    createFollow: (followerId: string, goingToFollowId: string) => {},
                    getFollowConnection: (followerId: string, goingToFollowId: string) => {},
                    getFollowing: (request: {}) => {},
                    getFollowingWithName: (request: {}) => {},
                    getFollowers: (request: {}) => {}
                }
            }
            helpers: {},
            models: {},
            error: (error: string, response: any) => void,
            protect: (callback: callback, req: any, res: any) => void
        },
        _root: string,
        _config: {
            app: {
                [name: string]: string
            },
            env: string,
            server: {
                secret: string,
                modulePath: string,
                host: string,
                protocols: {
                    https: {
                        enabled: string,
                        port: number,
                        ssl: {
                            cert: string,
                            key: string
                        }
                    },
                    http: {
                        enabled: boolean,
                        port: number
                    }
                }
            }
        },
    }
}