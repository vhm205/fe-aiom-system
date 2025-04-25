import { HttpStatusCode } from "Common/constants/http-code-constant";
import { request } from "helpers/axios";
import { ErrorHandler } from "helpers/error/error-handler";
import { convertObjToQueryString } from "helpers/utils";
import { IHttpResponse } from "types";

export const getCategoryList = async (
  payload: Record<string, string | number>
) => {
  const query = convertObjToQueryString(payload);

  const response: IHttpResponse = await request.get(`/categories?${query}`);
  const { isHasError, message } = ErrorHandler.checkResponse(
    response,
    HttpStatusCode.OK
  );

  if (isHasError) {
    throw new Error(message);
  }

  return {
    data: response.data,
    metadata: response.metadata,
  };
};