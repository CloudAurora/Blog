const toml = require('@iarna/toml');
const fs = require('fs');
const R = require('ramda');
const config = toml.parse(
    fs.readFileSync(require.resolve('./config.toml'),
    { encoding: 'utf8' })
);

module.exports = {
    serverRuntimeConfig: config.server,
    publicRuntimeConfig: R.omit(['server'], config),
    webpack: (config, { isServer }) => {
        // Fixes npm packages that depend on `fs` module
        if (!isServer) {
            config.node = {
                fs: 'empty'
            }
        }
        return config
    }
}
