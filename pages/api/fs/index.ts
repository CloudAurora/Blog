import { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'
import fs from 'fs'

export const config = {
    api: {
        bodyParser: false,
    },
}

const prefix = '/api/fs'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const paths = Array.isArray(req.query.path)
        ? req.query.path
        : req.query.path
        ? [req.query.path]
        : []
    const filePath = path.join(__dirname, ...paths)
    console.log('file path', filePath)
    try {
        const stat = fs.statSync(filePath)
        if (stat.isDirectory()) {
            return directory(res, filePath)
        }
        const content = fs.readFileSync(filePath, { encoding: 'utf-8' })
        return res.send(`${navi(filePath)}${content}`)
    } catch (err) {
        res.status(400)
        res.end(`error:${err.message}`)
    }
}

function navi(cur: string) {
    const parent = path.resolve(cur, '../')
    return `
        <p>current dir: ${cur}</p>
        <small>cwd: ${process.cwd()}</small>
        <hr />
        <ul>
        <li><a href="${prefix}?path=${parent}">../</a></li>
        </ul>
    `
}

function directory(res: NextApiResponse, cur: string) {
    const list = fs.readdirSync(cur)
    // res.setHeader('Content-Type', 'text/pain; charset=UTF-8')
    res.end(`
           ${navi(cur)} 
            <ul>
             ${list
                 .map(
                     (item) =>
                         `<li><a href="${prefix}?path=${path.join(
                             cur,
                             item
                         )}">${item}</a></li>`
                 )
                 .join('')}
            </ul>
        `)
}
