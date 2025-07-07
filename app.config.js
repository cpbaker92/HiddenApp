import 'dotenv/config';

export default {
  expo: {
    name: "hidden-app",
    slug: "hidden-app",
    version: "1.0.0",
    extra: {
      apiKey: process.env.API_KEY
    }
  }
};
