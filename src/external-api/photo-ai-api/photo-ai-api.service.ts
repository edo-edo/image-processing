import axios from "axios";
import { StatusCodes } from "http-status-codes";

import { RemoveObjectResponseDto } from "./dto/response/remove-object.response.dto";

export async function removeObjectFromPhoto(
  sourcePath: string,
  maskBase64: string,
  fileName: string,
): Promise<{
  success?: boolean;
  result?: RemoveObjectResponseDto;
  error?: {
    message?: string;
    code?: number;
  };
}> {
  try {
    const response = await axios.post(
      `${process.env.PHOT_AI_API_URL}/external/api/v2/user_activity/object-replacer`,
      {
        file_name: fileName,
        input_image_link: sourcePath,
        mask_image: `data:image/jpeg;base64,${maskBase64}`,
      },
      {
        headers: {
          "x-api-key": process.env.PHOT_AI_API_KEY,
          "Content-Type": "application/json",
        },
      },
    );

    return {
      success: true,
      result: response.data,
    };
  } catch (error) {
    console.error("Error calling Phot.ai API:", error);
    if (axios.isAxiosError(error) && error?.response) {
      return {
        success: false,
        error: {
          message: error.response.data.message,
          code: error.response.data.code,
        },
      };
    } else {
      return {
        success: false,
        error: {
          message: "An error occurred while calling the Photo.ai API",
          code: StatusCodes.INTERNAL_SERVER_ERROR,
        },
      };
    }
  }
}
