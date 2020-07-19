import React from 'react'
import { isServer } from 'utils'
import GitalkComponent from "gitalk/dist/gitalk-component";

interface IProps {
    id?: string
}
export function Comment({ id }: IProps) {
    return isServer() ? null : (<GitalkComponent
        options={{
            clientID: process.env.NEXT_PUBLIC_GITALK_CLIENT_ID,
            clientSecret: process.env.NEXT_PUBLIC_GITALK_CLIENT_SECRET,
            repo: "Blog",
            owner: "CloudAurora",
            admin: ["stkevintan", "CloudAurora"],
            id: id?.substr(0, 50)
        }}
    />
    )
}
