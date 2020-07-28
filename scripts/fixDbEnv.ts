import fs from 'fs';
import path from 'path';

const sourcePath = './prisma/dev.db';
if (!fs.existsSync(sourcePath)) {
    throw new Error(`Cannot find sqlite database at: ${sourcePath}`);
}

const targetPath = './node_modules/dev.db' 

fs.copyFileSync(sourcePath, targetPath);

const text = fs.readFileSync('./prisma/schema.prisma', {encoding: 'utf-8'});
fs.writeFileSync('./prisma/schema.prisma', text.replace(/^(\s*url\s*=\s*)\S*$/m, `$1"file:${path.resolve('../', targetPath)}"`));
// fs.writeFileSync('./prisma/.env', `SQLITE_DB_URL="file:${absPath}"`, { encoding: 'utf-8' });

console.log("set sqlite db path env to ", targetPath);