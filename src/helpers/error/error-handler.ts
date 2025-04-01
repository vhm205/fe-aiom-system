import { IHttpResponse } from "types";

export class ErrorHandler {
  static checkResponse(response: IHttpResponse, statusCode?: number) {
    if (!response.statusCode) {
      return { isHasError: true, message: response.message, response };
    }

    if (response.statusCode && (response.statusCode !== statusCode)) {
      return { isHasError: true, message: response.message, response };
    }

    if (!response.success) {
      return { isHasError: true, message: response.message, response };
    }

    return { isHasError: false, response };
  }
}
