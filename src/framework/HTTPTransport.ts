enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type Options = {
  method: METHOD;
  data?: any;
  timeout?: number;
  headers?: Record<string, string>
};

type Data = Record<string, string | number>;
type OptionsWithoutMethod = Omit<Options, 'method'>;
type HTTPMethod = (url: string, options?: OptionsWithoutMethod) => Promise<XMLHttpRequest>;



export class HTTPTransport {

  public queryString = (data: Data) => {
    return data ? ('?' + Object.keys(data).map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`).join('&')) : '';
  };

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
    const URL = 'https://ya-praktikum.tech/api/v2' + url;

    const { method, data, headers, timeout = 5000 } = options;

    const stringified = (method === METHOD.GET) ? this.queryString(data as Data) : '';

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, URL + stringified);

      for (const key in headers) {
        if (data && data[key]) xhr.setRequestHeader(key, data[key]);
      }

      xhr.onload = () => {
        try {
          if (xhr.response === 'OK') {
            resolve(xhr.response);
          } else {
            const response = JSON.parse(xhr.response);
            resolve(response);
          }
        } catch (error) {
          reject(new Error(`Failed to parse response: ${error}`));
        }
      };
      xhr.timeout = timeout;
      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;
      xhr.withCredentials = true;

      if (method === METHOD.GET || !data) {
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else {
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
      }
    });
  }
}
