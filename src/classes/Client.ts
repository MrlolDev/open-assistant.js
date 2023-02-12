import TaskOptions from 'src/interfaces/TaskOptions.interface.js';
import User from 'src/interfaces/User.interface.js';

export default class Client {
  private declare apiKey: string;
  private declare apiUrl: string;

  constructor(apiKey: string, apiUrl: string) {
    this.apiKey = apiKey;
    this.apiUrl = apiUrl;
  }

  public async getTask(options: TaskOptions) {
    return await this.baseRequest(`/tasks/`, { 'Content-type': 'application/json' }, { body: JSON.stringify(options) });
  }
  public async getAvailability(options: User) {
    return await this.baseRequest(
      `/tasks/availability`,
      { 'Content-type': 'application/json' },
      { body: JSON.stringify(options) },
    );
  }
  public async rejectTask(taskId: string, reason: string, user: User) {
    return await this.baseRequest(
      `/tasks/${taskId}/nack`,
      { 'Content-type': 'application/json', 'X-OASST-USER': `${user.auth_method}:${user.id}` },
      { body: JSON.stringify({ reason: reason }) },
    );
  }

  private async baseRequest(url: string, headers?, options?, method: 'get' | 'post' = 'post') {
    try {
      var res = await fetch(`${this.apiUrl}/v1${url}`, {
        method: method,
        headers: {
          'X-API-Key': this.apiKey,
          ...headers,
        },
        ...options,
      });
      if (res.body) {
        var json = await res.json();
        return json;
      }
      return true;
    } catch (err) {
      throw new Error(err);
    }
  }
}
