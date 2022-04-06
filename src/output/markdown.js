const { htmlMd } = require('../lib/block-code.js');
const fs = require('fs');
const { resolve } = require('path');
const prettier = require('../lib/prettier.js');
const snippetsRoot = resolve(__dirname, '../snippets/');

const markdownBody = body => {
    return `# JavaScript Snippets

> JavaScript Snippets for MDN

<p align="center">
  <img src="https://images.cnblogs.com/cnblogs_com/jwyblogs/1576071/o_220312063215_javascript.png" alt="icon">
</p>
<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=jwy.javascript-snippets-self">
    <img src="https://img.shields.io/visual-studio-marketplace/i/jwy.javascript-snippets-self?style=square" alt="">
  </a>
  <a href="https://marketplace.visualstudio.com/items?itemName=jwy.javascript-snippets-self">
    <img src="https://img.shields.io/visual-studio-marketplace/d/jwy.javascript-snippets-self?style=square" alt="">
  </a>
  <a href="https://marketplace.visualstudio.com/items?itemName=jwy.javascript-snippets-self">
    <img src="https://img.shields.io/visual-studio-marketplace/stars/jwy.javascript-snippets-self?style=square" alt="">
  </a>
  <a href="https://github.com/jwyGithub/JavaScript-Snippets/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/jwyGithub/JavaScript-Snippets?style=square" alt="">
    
  </a>
</p>

## Snippets

${body}

### Supported languages

-   javascript (.js)
-   typescript (.ts)
-   javascriptreact (.jsx)
-   typescripereact (.tsx)
`;
};

try {
    const mdContent = fs.readdirSync(snippetsRoot, { withFileTypes: true }).reduce((pre, item) => {
        const path = resolve(__dirname, snippetsRoot, item.name);
        return pre + htmlMd(require(path), item.name) + '\n';
    }, '');

    fs.writeFileSync(resolve(__dirname, '../../README.md'), prettier(markdownBody(prettier(mdContent, 'html')), 'markdown'));
} catch (error) {
    console.log(error);
}
