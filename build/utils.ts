import fs from 'node:fs';
import path from 'node:path';

/**
 * @description 判断是否是文件夹
 * @param {string} dir
 * @returns  {boolean} 是否是文件夹
 */
export function isDir(dir: string): boolean {
    return fs.statSync(dir).isDirectory();
}

/**
 * @description 获取文件
 * @param {string} dir
 */
export function getFiles(dir: string) {
    const result: Array<{
        filePath: string;
        fileName: string;
    }> = [];

    const _getFiles = (dirs: string) => {
        fs.readdirSync(dirs).forEach(dir => {
            const scanDir = path.join(dirs, dir);
            if (isDir(scanDir)) {
                _getFiles(scanDir);
            } else {
                result.push({
                    filePath: scanDir,
                    fileName: dir
                });
            }
        });
        return result;
    };

    return _getFiles(dir);
}
