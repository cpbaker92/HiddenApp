import 'dotenv/config';

export default {
  expo: {
    name: "hidden-app",
    slug: "hidden-app",
    version: "1.0.0",
    extra: {
      apiBibleKey: process.env.API_BIBLE_KEY
    },
    splash: {
      image: "./assets/images/splash-logo.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    ios: {
      bundleIdentifier: "com.example.hiddenapp"
    }
  }
};
