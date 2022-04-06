exports.tableStr = content => {
    return `<table border>
                <tr style="font-weight:bold">
                    <td width="200">Snippet prefix</td>
                    <td width="200">prefix</td>
                    <td>Description</td>
                </tr>
            ${content}
            </table><br/>`;
};

exports.trStr = content => {
    return `<tr style="color: #1296db">${content}</tr>`;
};

exports.tdStr = arrContent => {
    return arrContent.reduce((pre, cur, index, array) => {
        return pre + `<td>${cur}</td>`;
    }, '');
};

exports.htmlMd = (snippets, type) => {
    return (
        '\n' +
        `> ${type}` +
        '\n' +
        this.tableStr(
            snippets.reduce((pre, item, index, array) => {
                return pre + this.trStr(this.tdStr([item.prefix, item.key || '', item.description]));
            }, '')
        )
    );
};

