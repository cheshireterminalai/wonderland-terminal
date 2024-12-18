/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly OPEN_ROUTER_API_KEY: string
  readonly OPEN_ROUTER_MODEL: string
  readonly OPEN_AI_API_KEY: string
  readonly ELEVEN_LABS_API_KEY: string
  readonly ELEVEN_LABS_AGENT_ID: string
  readonly OPEN_ROUTER_VISION_MODEL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}