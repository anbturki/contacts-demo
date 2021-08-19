module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/contacts-demo/" : "/",
  transpileDependencies: ["vuetify"]
};
