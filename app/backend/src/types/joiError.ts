export type JoiError = {
  details: {
    message: string;
    path: (string | number)[];
    type: string;
    context?: { [key: string]: any };
  }[];
  message: string;
};
