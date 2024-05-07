import { SNIPPETS_TEMPLATE_ROOT, SNIPPETS_OUTPUT_ROOT } from '../src/const/const';
import fs from 'node:fs';
import { getFiles } from './utils';
import prettier from './prettier';
import type { BuiltInParserName, LiteralUnion } from 'prettier';

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
        const body = await prettier(fs.readFileSync(item.filePath, 'utf-8'), 'typescript');
        snippetsRoot.push({
            key: item.fileName.replace('.tsx', ''),
            prefix: item.fileName.replace('.tsx', ''),
            body: body,
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

/**
 * @description 获取snippets配置
 * @returns
 */
function getSnippetsConfig() {
    buildTemplate();
}

getSnippetsConfig();

