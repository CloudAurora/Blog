export type Config = {
    common: {
        timeFormatter: string
        siteName: string
    },
    server: {
        jwt: {
            secret: string
        }
    }
}

export type ServerRuntimeConfig = Config['server'];
export type PublicRuntimeConfig = Omit<Config, 'server'>;