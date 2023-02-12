import TaskOptions from 'src/interfaces/TaskOptions.interface.js';

export default class Client {
  private declare apiKey: string;
  private declare apiUrl: string;

  constructor(apiKey: string, apiUrl: string) {
    this.apiKey = apiKey;
    this.apiUrl = apiUrl;
  }

  public async getTask(options: TaskOptions) {
    return await this.baseRequest(`/taks/`, { 'Content-type': 'application/json' }, { body: JSON.stringify(options) });
  }
  private async baseRequest(url: string, headers?, options?) {
    try {
      var res = await fetch(`${this.apiUrl}/v1${url}`, {
        method: 'post',
        headers: {
          'X-API-Key': this.apiKey,
          ...headers,
        },
        ...options,
      });
      var json = await res.json();
      return json;
    } catch (err) {
      throw new Error(err.detail);
    }
  }
}
