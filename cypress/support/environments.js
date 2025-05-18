const ENVIRONMENTS = {
    dev: "https://gorest.co.in/public/v1/"
};

const TOKENS = {
    dev: "Bearer 55d6636b25b84832f383665a17f72117ee2b5e655a78ba968912c9a37d1c050f"
};

function getBaseUrl(envName = "dev") {
    return ENVIRONMENTS[envName] || ENVIRONMENTS.dev;
}

function getToken(envName = "dev") {
    return TOKENS[envName] || TOKENS.dev;
}

module.exports = { getBaseUrl, getToken };