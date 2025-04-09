import { defineFunction, secret } from "@aws-amplify/backend";

export const functionGenerateRecipe = defineFunction({
  name: "functionGenerateRecipe",
  layers: {
    miLayer: "arn:aws:lambda:us-east-1:839284599071:layer:miLayer:2",
  },
  environment: {
    GOOGLE_GENERATIVE_AI_API_KEY: secret("GOOGLE_GENERATIVE_AI_API_KEY"),
  },
});
