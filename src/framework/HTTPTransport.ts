enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type Options = {
  method: METHOD;
  // data?: Record<string, string> | undefined;
  data?: any;
  timeout?: number;
  headers?: Record<string, string>
};

type Data = Record<string, string | number>;
type OptionsWithoutMethod = Omit<Options, 'method'>;
type HTTPMethod = (url: string, options?: OptionsWithoutMethod) => Promise<XMLHttpRequest>;

const queryString = (data: Data) => {
  return data ? ('?' + Object.keys(data).map((key) => { return `${key}=${data[key]}`; }).join('&')) : '';
};

export class HTTPTransport {

  public get: HTTPMethod = (url, options = {}) => (
    this.request(url, { ...options, method: METHOD.GET })
  );

  public post: HTTPMethod = (url, options = {}) => (
    this.request(url, { ...options, method: METHOD.POST })
  );

  public put: HTTPMethod = (url, options = {}) => (
    this.request(url, { ...options, method: METHOD.PUT })
  );

  public delete: HTTPMethod = (url, options = {}) => (
    this.request(url, { ...options, method: METHOD.DELETE })
  );

  request(url: string, options: Options): Promise<XMLHttpRequest> {
    const { method, data, headers, timeout = 5000 } = options;

    const stringified = (method === METHOD.GET) ? queryString(data as Data) : '';

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url + stringified);

      for (const key in headers) {
        if (data && data[key]) xhr.setRequestHeader(key, data[key]);
      }

      xhr.onload = () => {
        resolve(xhr);
      };
      xhr.timeout = timeout;
      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHOD.GET || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }
}
