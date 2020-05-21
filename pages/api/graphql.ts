import { startServer } from 'apollo/server'
import { ApolloServer } from 'apollo-server-micro'
import { NextApiRequest, NextApiResponse } from 'next'

export const config = {
    api: {
        bodyParser: false,
    },
}

let handler: ((req: any, res: any) => Promise<any>) | null = null

export default async (res: NextApiRequest, req: NextApiResponse) => {
    const h = handler ?? (handler = await startServer({ path: '/api/graphql' }))
    return h(res, req)
}
