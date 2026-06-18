/** Supported chat providers in the settings UI and runtime. */
export type ChatProviderOption =
  | 'openai'
  | 'openrouter'
  | 'gemini'
  | 'gemini-nano'
  | 'claude'
  | 'xai'
  | 'zai'
  | 'kimi'
  | 'openai-compatible';
/** Supported text-to-speech engines in the settings UI and runtime. */
export type TTSEngineOption =
  | 'openai'
  | 'geminiTts'
  | 'openaiCompatible'
  | 'voicevox'
  | 'voicepeak'
  | 'aivisSpeech'
  | 'aivisCloud'
  | 'minimax'
  | 'xai'
  | 'unrealSpeech'
  | 'elevenLabs'
  | 'piperPlus'
  | 'none';
/** Supported live comment source platforms. */
export type StreamingPlatformOption = 'none' | 'youtube' | 'twitch';

/** API keys keyed by chat provider. */
export interface ProviderApiKeys {
  openai?: string;
  openrouter?: string;
  gemini?: string;
  claude?: string;
  xai?: string;
  zai?: string;
  kimi?: string;
  'openai-compatible'?: string;
}

/** LLM provider, model, endpoint, and model cache settings. */
export interface LLMSettings {
  provider: ChatProviderOption;
  model: string;
  endpoint?: string;
  apiKeys: ProviderApiKeys;
  openRouterDynamicFreeModels?: {
    models: string[];
    fetchedAt: number;
    maxCandidates: number;
  };
}

/** Text-to-speech engine and provider-specific voice settings. */
export interface TTSSettings {
  engine: TTSEngineOption;
  speaker: string;
  openAiCompatibleApiKey?: string;
  openAiCompatibleApiUrl?: string;
  openAiCompatibleModel?: string;
  openAiCompatibleSpeed?: string;
  geminiTtsModel?: string;
  geminiTtsLanguageCode?: string;
  geminiTtsPrompt?: string;
  voicevoxApiUrl?: string;
  voicepeakApiUrl?: string;
  aivisSpeechApiUrl?: string;
  aivisCloudApiKey?: string;
  aivisCloudModelUuid?: string;
  aivisCloudSpeakerUuid?: string;
  aivisCloudStyleId?: string;
  minimaxApiKey?: string;
  minimaxGroupId?: string;
  xaiLanguage?: string;
  xaiCodec?: string;
  xaiSampleRate?: number;
  xaiBitRate?: number;
  unrealSpeechApiKey?: string;
  unrealSpeechApiUrl?: string;
  unrealSpeechBitrate?: string;
  unrealSpeechSpeed?: string;
  unrealSpeechPitch?: string;
  unrealSpeechCodec?: string;
  unrealSpeechTemperature?: string;
  elevenLabsApiKey?: string;
  elevenLabsApiUrl?: string;
  elevenLabsModel?: string;
  elevenLabsOutputFormat?: string;
  elevenLabsLanguageCode?: string;
  elevenLabsStability?: string;
  elevenLabsSimilarityBoost?: string;
  elevenLabsStyle?: string;
  elevenLabsUseSpeakerBoost?: 'default' | 'true' | 'false';
  elevenLabsSpeed?: string;
  elevenLabsSeed?: string;
  elevenLabsApplyTextNormalization?: 'default' | 'auto' | 'on' | 'off';
  piperPlusBasePath?: string;
  piperPlusModelConfigFile?: string;
  piperPlusModelFile?: string;
  piperPlusVoiceFile?: string;
  piperPlusSpeed?: string;
  piperPlusNoiseScale?: string;
}

/** Live comment ingestion settings for supported streaming platforms. */
export interface StreamSettings {
  platform: StreamingPlatformOption;
  youtubeApiKey: string;
  youtubeLiveId: string;
  youtubeEnabled: boolean;
  youtubeCommentIntervalMs: number;
  twitchClientId: string;
  twitchAccessToken: string;
  twitchChannel: string;
  twitchEnabled: boolean;
  twitchCommentIntervalMs: number;
}

/** Complete persisted application settings shape. */
export interface AppSettings {
  llm: LLMSettings;
  tts: TTSSettings;
  stream: StreamSettings;
}
