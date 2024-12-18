export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface ApiKeys {
  openRouterApiKey: string;
  openRouterModel: string;
  openAiApiKey: string;
  elevenLabsApiKey: string;
  elevenLabsAgentId: string;
  openRouterVisionModel: string;
}