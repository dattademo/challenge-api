const ENVIRONMENTS = {
    dev: "https://gorest.co.in/public/v1/"
};

const TOKENS = {
    dev: "Bearer 03ed3f6ef55bc8a25b4b5ed276f5e13b8d058708ac3f962af174b61bfe3c19be"
};

function getBaseUrl(envName = "dev") {
    return ENVIRONMENTS[envName] || ENVIRONMENTS.dev;
}

function getToken(envName = "dev") {
    return TOKENS[envName] || TOKENS.dev;
}

module.exports = { getBaseUrl, getToken };