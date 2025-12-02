module.exports = {
    "/validator": {
        target: "https://lvf.listspl.com:1355/ListValidationFramework/validator",
        secure: false, // जर self-signed SSL असेल तर false ठेवा
        changeOrigin: true,

        pathRewrite: {
            "^/validator": ""
        },

        logLevel: "debug",

        onProxyRes(proxyRes, req, res) {
            delete proxyRes.headers['access-control-allow-origin'];
            proxyRes.headers['access-control-allow-origin'] = req.headers.origin || '*';
            proxyRes.headers['access-control-allow-methods'] = 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS';
            proxyRes.headers['access-control-allow-headers'] = 'Content-Type, Authorization';
        }
    }
};