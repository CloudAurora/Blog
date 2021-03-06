import { startServer } from 'apollo/server'
import { NextApiRequest, NextApiResponse } from 'next'

export const config = {
    api: {
        bodyParser: false,
    },
}

let handler: ((req: any, res: any) => Promise<any>) | null = null

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const h = handler ?? (handler = await startServer({ path: '/api/graphql' }))
    return h(req, res)
}
