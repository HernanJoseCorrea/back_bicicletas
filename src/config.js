const config = {
  application: {
    cors: {
      server: [
        {
          origin: "http://bicicletash", //servidor que deseas que consuma o (*) en caso que sea acceso libre
          credentials: true
        }
      ]
    }
  }
}

module.exports = config;