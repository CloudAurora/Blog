import fs from 'fs';
import path from 'path';

const relativePath = './public/dev.db';
if (!fs.existsSync(relativePath)) {
    throw new Error(`Cannot find sqlite database at: ${relativePath}`);
}

const absPath = '/dev.db' 

const text = fs.readFileSync('./prisma/schema.prisma', {encoding: 'utf-8'});
fs.writeFileSync('./prisma/schema.prisma', text.replace(/^(\s*url\s*=\s*)\S*$/m, `$1"file:${absPath}"`));
// fs.writeFileSync('./prisma/.env', `SQLITE_DB_URL="file:${absPath}"`, { encoding: 'utf-8' });

console.log("set sqlite db path env to ", absPath);