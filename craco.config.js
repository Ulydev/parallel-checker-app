const rawLoader = require("craco-raw-loader")

module.exports = {
    style: {
        postcss: {
            plugins: [require("tailwindcss"), require("autoprefixer")]
        }
    },
    plugins: [{ plugin: rawLoader, options: { test: /\.txt$/ } }]
}
