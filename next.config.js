const toml = require('@iarna/toml')
const fs = require('fs')
const _ = require('lodash')

const config = toml.parse(
    fs.readFileSync(require.resolve('./config.toml'), { encoding: 'utf8' })
)

module.exports = {
    serverRuntimeConfig: config.server,
    publicRuntimeConfig: _.omit(config, ['server']),
    webpack: (config, { isServer }) => {
        // Fixes npm packages that depend on `fs` module
        if (!isServer) {
            config.node = {
                fs: 'empty',
            }
        }
        return config
    },
}
