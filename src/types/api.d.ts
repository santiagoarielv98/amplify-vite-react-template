export interface Recipe {
  title: string;
  description: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: "easy" | "medium" | "hard";
  ingredients: string[];
  steps: string[];
  restrictions: string[];
  tags: string[];
}
