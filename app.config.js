import "dotenv/config";

export default {
  expo: {
    extra: {
      backendApi: process.env.BACKEND_API,
    },
  },
};
