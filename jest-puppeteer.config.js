module.exports = {
  launch: {
    headless: true,
  },
  server: {
    protocol: "http-get",
    command: "npm run dev",
    host: "127.0.0.1",
    port: 3000,
    launchTimeout: 10000,
    waitOnScheme: {
      headers: {
        Accept: "text/html",
      },
    },
  },
};
