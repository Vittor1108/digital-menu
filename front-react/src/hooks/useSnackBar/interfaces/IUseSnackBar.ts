import { ApiException } from "../../../services/api/ApiException";

export interface IUseSnackBar<T> {
  title: string;
  description: string;
  status: "loading" | "info" | "warning" | "success" | "error" | undefined;
  duration: number;
  isClosable: boolean;
  response: T | ApiException;
}
