import { Logger } from '@nestjs/common';

const MISSING_REQUIRED_DEPENDENCY = (
  defaultPlatform: string,
  transport: string,
) =>
  `No driver (${transport}) has been selected. In order to take advantage of the default driver, please, ensure to install the "${defaultPlatform}" package ($ npm install ${defaultPlatform}).`;

const logger = new Logger('PackageLoader');

/**
 * 
 * @param defaultPlatform   例如 @nestjs/platform-express
 * @param transport 例如'HTTP'
 * @param loaderFn 例如 () => require('@nestjs/platform-express'),
 * @returns 
 * 
 */
export function loadAdapter(
  defaultPlatform: string,
  transport: string,
  loaderFn?: Function,
) {
  try {
    return loaderFn ? loaderFn() : require(defaultPlatform);
  } catch (e) {
    logger.error(MISSING_REQUIRED_DEPENDENCY(defaultPlatform, transport));
    process.exit(1);
  }
}
