import { getToken } from '@/http/token';
import { Message } from '@arco-design/web-vue';

export type Result<T> = {
  success: boolean;
  code: number;
  message: string;
  data: T;
};

// 导出Request类，可以用来自定义传递配置来创建实例
class Request {
  // 基础配置，url和超时时间
  baseConfig: RequestConfig = { baseURL: import.meta.env.VITE_BASE_API, timeout: 60000 };
  // 用于控制是否使用默认的Content-Type
  private useDefaultContentType: boolean = true;

  // 定义请求方法
  private async request<T>(url: string, options: RequestOptions = {}): Promise<T> {
    const { method = 'GET', headers = {}, body } = options;

    const defaultHeaders: Record<string, string> = {};

    const token = getToken() as string;
    if (token) {
      defaultHeaders['Authorization'] = `Bearer ${token}`;
    }
    // 只有当useDefaultContentType为true才使用默认的Content-Type
    if (this.useDefaultContentType) {
      defaultHeaders['Content-Type'] = 'application/json';
    }

    const mergedHeaders = {
      ...defaultHeaders,
      ...headers
    };

    const requestOptions: RequestInit = {
      method,
      headers: mergedHeaders
    };

    if (body) {
      requestOptions.body = JSON.stringify(body);
    }

    const fullUrl = this.baseConfig.baseURL + url;

    const response = await fetch(fullUrl, requestOptions);
    const res = await response.json();
    const result: Result<T> = { success: res.success, code: res.code, message: res.message, data: res.data };

    if (!result.success) {
      let message = '';
      if (result.code !== 200 && result.code !== 2001) {
        message = result.message;
      }
      Message.error(message);
      throw new Error(message);
    }

    return result.data;
  }

  private async streamRequest(url: string, options: RequestOptions = {}): Promise<any> {
    const { method = 'GET', headers = {}, body } = options;

    const defaultHeaders: Record<string, string> = {};

    const token = getToken() as string;
    if (token) {
      defaultHeaders['Authorization'] = `Bearer ${token}`;
    }

    if (this.useDefaultContentType) {
      defaultHeaders['Content-Type'] = 'application/json';
    }

    const mergedHeaders = {
      ...defaultHeaders,
      ...headers
    };

    const requestOptions: RequestInit = {
      method,
      headers: mergedHeaders
    };

    if (body) {
      requestOptions.body = JSON.stringify(body);
    }

    const fullUrl = this.baseConfig.baseURL + url;

    return await fetch(fullUrl, requestOptions);
  }

  // 禁用默认Content-Type
  public disableDefaultContentType() {
    this.useDefaultContentType = false;
  }

  public async get<T = any>(url: string, config?: RequestOptions): Promise<T> {
    return this.request<T>(url, { ...config, method: 'GET' });
  }

  public async post<T = any>(url: string, data?: any, config?: RequestOptions): Promise<T> {
    return this.request<T>(url, { ...config, method: 'POST', body: data });
  }

  public async put<T = any>(url: string, data?: any, config?: RequestOptions): Promise<T> {
    return this.request<T>(url, { ...config, method: 'PUT', body: data });
  }

  public async delete<T = any>(url: string, config?: RequestOptions): Promise<T> {
    return this.request<T>(url, { ...config, method: 'DELETE' });
  }

  public async stream(url: string, config?: RequestOptions): Promise<any> {
    return this.streamRequest(url, { ...config, method: 'POST' });
  }

}

// 定义请求相关的类型
type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface RequestConfig {
  baseURL?: string;
  timeout?: number;
}

interface RequestOptions {
  method?: RequestMethod;
  headers?: Record<string, string>;
  body?: any;
}


const request = new Request();
export default request;
