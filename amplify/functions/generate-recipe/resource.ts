import { defineFunction } from "@aws-amplify/backend";

export const generateRecipe = defineFunction({
  name: "functionGenerateRecipe",
  layers: {
    miLayer: "arn:aws:lambda:us-east-1:839284599071:layer:miLayer:1",
  },
});
