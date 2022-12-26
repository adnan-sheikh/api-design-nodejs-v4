import merge from "lodash.merge";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

const stage = process.env.STAGE || "local";

let envConfig;

if (stage === "production") {
  envConfig = require("./prod").default;
} else if (stage === "staging") {
  envConfig = require("./staging").default;
} else if (stage === "testing") {
  envConfig = require("./testing").default;
} else {
  envConfig = require("./local").default;
}

const defaultConfig = {
  stage,
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  secrets: {
    jwt: process.env.JWT_SECRET,
    dbUrl: process.env.DATABASE_URL,
  },
};

const config = merge(defaultConfig, envConfig);

export default config;
