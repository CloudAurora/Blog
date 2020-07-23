import fs from 'fs';
import path from 'path';

const relativePath = './prisma/dev.db';
if (!fs.existsSync(relativePath)) {
    throw new Error(`Cannot find sqlite database at: ${relativePath}`);
}

const absPath = path.resolve(relativePath)
fs.writeFileSync('./prisma/.env', `SQLITE_DB_URL="file:${absPath}"`, { encoding: 'utf-8' });

console.log("set sqlite db path env to ", absPath);