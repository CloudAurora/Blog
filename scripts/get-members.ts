require('dotenv').config({
    path: __dirname + '/.env.local',
})

import config from '../config'
import { Octokit } from '@octokit/rest'
import fs from 'fs'



console.log('access_token', process.env.access_token)
const octokit = new Octokit({
    auth: process.env.access_token,
})

async function fetch(){
    const ret = await Promise.all(
        config.members.map((member) =>
            octokit.users.getByUsername({ username: member })
        )
    )
    return ret.map((user, index) => ({
        url: user.data.html_url,
        id: user.data.id,
        name: user.data.name ?? config.members[index],
        avatar: user.data.avatar_url,
        company: user.data.company,
        blog: user.data.blog,
        email: user.data.email,
        bio: user.data.bio,
        location: user.data.location
    }))
}

async function main() {
    const members = await fetch()
    console.log(members)
    fs.writeFileSync(
        __dirname + '/../generated/members.json',
        JSON.stringify(members, undefined, 4)
    )
    console.log('done')
}
main()
