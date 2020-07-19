import { NextApiRequest, NextApiResponse } from 'next'

export const config = {
    api: {
        bodyParser: false,
    },
}

export default (req: NextApiRequest, res: NextApiResponse) => {
    res.send('hello world')
}
