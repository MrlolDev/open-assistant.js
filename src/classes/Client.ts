import TaskOptions from 'src/interfaces/TaskOptions.interface.js';
import User from 'src/interfaces/User.interface.js';
import Task from 'src/interfaces/Task.interface.js';
import { randomUUID } from 'node:crypto';

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
  public async acceptTask(taskId: string, user: User, messageId?: string) {
    if (!messageId) messageId = randomUUID();
    await this.baseRequest(
      `/tasks/${taskId}/ack`,
      { 'Content-type': 'application/json', 'X-OASST-USER': `${user.auth_method}:${user.id}` },
      { body: JSON.stringify({ message_id: messageId }) },
    );
    return messageId;
  }

  public async solveTask(
    task: Task,
    user: User,
    lang: string,
    text: string,
    messageId: string,
    userMessageId?: string,
  ) {
    if (!userMessageId) userMessageId = randomUUID();
    return await this.baseRequest(
      `/tasks/interaction`,
      { 'Content-type': 'application/json' },
      {
        body: JSON.stringify({
          type: this.formatTaskType(task.type),
          taskId: task.id,
          user: user,
          message_id: messageId,
          user_message_id: userMessageId,
          lang: lang,
          text: text,
        }),
      },
    );
  }

  private formatTaskType(taskType: string) {
    if (taskType == 'initial_prompt') {
      return 'text_reply_to_message';
    }
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
