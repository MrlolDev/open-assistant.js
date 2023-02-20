import TaskOptions from '../interfaces/TaskOptions.interface.js';
import User from '../interfaces/User.interface.js';
import Task from '../interfaces/Task.interface.js';
import { randomUUID } from 'node:crypto';
import TaskContent from '../interfaces/TaskContent.interface.js';

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
  public async getAvailability(options: User, lang: string) {
    return await this.baseRequest(
      `/tasks/availability?lang=${lang}`,
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
    content: TaskContent,
    messageId: string,
    userMessageId?: string,
  ) {
    if (!userMessageId) userMessageId = randomUUID();
    var url = `/tasks/interaction`;
    if (this.formatTaskType(task.type) == 'text_labels') {
      url = `/text_labels`;
    }
    return await this.baseRequest(
      url,
      { 'Content-type': 'application/json' },
      {
        body: JSON.stringify({
          type: this.formatTaskType(task.type),
          taskId: task.id,
          user: user,
          message_id: messageId,
          user_message_id: userMessageId,
          lang: lang,
          ...content,
        }),
      },
    );
  }

  public async getLeaderboard(timeFrame: 'day' | 'week' | 'month' | 'total' = 'day', maxCount: number = 100) {
    return await this.baseRequest(
      `/leaderboards/${timeFrame}?max_count=${maxCount}`,
      { 'Content-type': 'application/json' },
      {},
      'get',
    );
  }

  private formatTaskType(taskType: string) {
    if (taskType == 'initial_prompt' || 'assistant_reply' || 'prompter_reply') {
      return 'text_reply_to_message';
    } else {
      return 'text_labels';
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
