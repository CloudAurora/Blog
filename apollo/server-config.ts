import getConfig from 'next/config'
import { ServerRuntimeConfig, PublicRuntimeConfig } from 'types';




export const ServerConfig: ServerRuntimeConfig = getConfig().serverRuntimeConfig;
export const PublicConfig: PublicRuntimeConfig = getConfig().publicRuntimeConfig;