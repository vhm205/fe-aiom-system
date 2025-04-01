import { HttpStatusCode } from "Common/constants/http-code-constant";
import { request } from "helpers/axios";
import { ErrorHandler } from "helpers/error/error-handler";
import { convertObjToQueryString } from "helpers/utils";
import { IHttpResponse } from "types";

export const getSuppliers = async (
  payload: Record<string, string | number>
) => {
  const query = convertObjToQueryString(payload);

  const response: IHttpResponse = await request.get(`/suppliers?${query}`);
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

export const getSupplier = async (
  id: string
) => {
  const response: IHttpResponse = await request.get(`/suppliers/${id}`);
  const { isHasError, message } = ErrorHandler.checkResponse(
    response,
    HttpStatusCode.OK
  );

  if (isHasError) {
    throw new Error(message);
  }

  return response.data;
};

export const createSupplier = async (payload: Record<string, any>) => {
  const response: IHttpResponse = await request.post(`/suppliers`, payload);
  const { isHasError, message } = ErrorHandler.checkResponse(
    response,
    HttpStatusCode.CREATED
  );

  if (isHasError) {
    throw new Error(message);
  }

  const { id, code } = response.data;
  const data = {
    id,
    code,
    ...payload,
  };

  return data;
};

export const updateSupplier = async (payload: Record<string, any>) => {
  const response: IHttpResponse = await request.put(
    `/suppliers/${payload.id}`,
    payload
  );
  const { isHasError, message } = ErrorHandler.checkResponse(
    response,
    HttpStatusCode.OK
  );

  if (isHasError) {
    throw new Error(message);
  }

  return {
    id: response.data?.id,
    ...payload,
  };
};

export const deleteSupplier = async (id: string) => {
  const response: IHttpResponse = await request.delete(`/suppliers/${id}`);
  const { isHasError, message } = ErrorHandler.checkResponse(
    response,
    HttpStatusCode.NO_CONTENT
  );

  if (isHasError) {
    throw new Error(message);
  }

  return id;
};
