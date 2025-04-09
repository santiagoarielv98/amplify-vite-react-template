import { useState } from "react";
import { baseUrl } from "../config/api";
import { uploadData } from "aws-amplify/storage";
import { client } from "../client";
import { base64ToBlob } from "../utils/image";

interface ImageGeneratorInput {
  title: string;
  description: string;
}

interface ImageGeneratorResponse {
  base64Data: string;
  mimeType: string;
}

export const useImageGenerator = (id: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const generateImage = async ({
    title,
    description,
  }: ImageGeneratorInput): Promise<ImageGeneratorResponse> => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`${baseUrl}/recipes/generate-image`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ImageGeneratorResponse = await response.json();

      if (!data.base64Data || !data.mimeType) {
        throw new Error("Invalid response data");
      }

      const { base64Data, mimeType } = data;

      const blob = base64ToBlob(base64Data, mimeType);
      const file = new File([blob], `${title}.png`, { type: mimeType });

      const result = await uploadData({
        path: ({ identityId }) => `images/${identityId}/${title}.png`,
        data: file,
      }).result;

      client.models.Recipe.update({ id, image: result.path });

      return data;
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error("An unknown error occurred");
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const removeImage = async () => {
    await client.models.Recipe.update({
      id,
      image: null,
    });
  };

  return {
    generateImage,
    removeImage,
    isLoading,
    error,
  };
};
