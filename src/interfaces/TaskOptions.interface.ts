import User from './User.interface.js';

export default interface TaskOptions {
  type:
    | 'random'
    | 'initial_prompt'
    | 'rank_assistant_replies'
    | 'label_assistant_reply'
    | 'label_initial_prompt'
    | 'label_prompter_reply'
    | 'assistant_reply'
    | 'prompter_reply';
  user: User;
  collective: boolean;
  lang: string;
}
