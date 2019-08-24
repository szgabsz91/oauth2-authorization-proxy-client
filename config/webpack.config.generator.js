module.exports = config => {
    return require(`./webpack.${config.type}.config.js`)(config);
};
