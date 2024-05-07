import path from 'node:path';

/**
 * @description The root path of the snippets.yml file
 */
export const SNIPPETS_TEMPLATE_ROOT = path.resolve(__dirname, '../snippets/template');

/**
 * @description The root path of the snippets output
 */
export const SNIPPETS_OUTPUT_ROOT = path.resolve(__dirname, '../../snippets/snippets.code-snippets');

/**
 * @description The root path of the snippets input
 */
export const SNIPPETS_INPUT_ROOT = path.resolve(__dirname, '../../src/snippets');

