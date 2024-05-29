import fs from 'node:fs';
import type { BuiltInParserName, LiteralUnion } from 'prettier';
import { DEFAULT_OPTIONS, format } from '@jiangweiye/prettier-config';
import { SNIPPETS_OUTPUT_ROOT, SNIPPETS_TEMPLATE_ROOT } from '../src/const/const';
import { getFiles } from './utils';

/**
 * @description 追加snippets
 * @param snippets
 */
function appendSnippets(snippets = {}) {
    const preSnippets = fs.readFileSync(SNIPPETS_OUTPUT_ROOT, 'utf-8');
    const preSnippetsObj = JSON.parse(preSnippets);
    const newSnippets = {
        ...preSnippetsObj,
        ...snippets
    };
    fs.writeFileSync(SNIPPETS_OUTPUT_ROOT, JSON.stringify(newSnippets, null, 4));
}

/**
 * @description 构建模板
 */
async function buildTemplate() {
    const templates = getFiles(SNIPPETS_TEMPLATE_ROOT);

    const snippetsRoot: Array<{
        key: string;
        prefix: string;
        body: string;
        parser: LiteralUnion<BuiltInParserName, string>;
        description: string;
    }> = [];

    for await (const item of templates) {
        const body = await format(fs.readFileSync(item.filePath, 'utf-8'), {
            ...DEFAULT_OPTIONS,
            parser: 'typescript',
            printWidth: 140,
            endOfLine: 'crlf'
        });
        snippetsRoot.push({
            key: item.fileName.replace('.tsx', ''),
            prefix: item.fileName.replace('.tsx', ''),
            body,
            parser: 'typescript',
            description: ''
        });
    }

    const snippets = snippetsRoot.reduce((pre, item) => {
        return {
            ...pre,
            [item.key]: {
                prefix: item.prefix,
                body: item.body,
                description: item.description
            }
        };
    }, {});

    appendSnippets(snippets);
}

function getSnippetsConfig() {
    buildTemplate();
}

getSnippetsConfig();
