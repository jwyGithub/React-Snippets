const fs = require('fs');
const { resolve } = require('path');
const prettier = require('./lib/prettier.js');

const snippetsJSONRoot = resolve(__dirname, '../snippets/snippets.code-snippets');
const snippetsRoot = resolve(__dirname, './snippets');

const format = ({ key, prefix, body, description }) => {
    return {
        [key]: {
            prefix,
            body: prettier(body),
            description
        }
    };
};

const generator = () => {
    try {
        let snippets = fs.readdirSync(snippetsRoot, { withFileTypes: true }).reduce((pre, item) => {
            const path = resolve(__dirname, snippetsRoot, item.name);
            require(path).forEach(item => {
                const _snippet = format(item);
                pre = { ...pre, ..._snippet };
            });
            return pre;
        }, {});

        fs.writeFileSync(snippetsJSONRoot, JSON.stringify(snippets, null, 4));
    } catch (error) {
        console.log(error);
    }
};

generator();
