export default interface TaskContent {
  text: string;
  labels?: {
    creativity: number;
    fails_task: number;
    hate_speech: number;
    helpfulness: number;
    humor: number;
    lang_mismatch: number;
    not_appropriate: number;
    pii: number;
    quality: number;
    sexual_content: number;
    spam: number;
    toxicity: number;
    violence: number;
  };
}
