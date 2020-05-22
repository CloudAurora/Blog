import React from 'react'
import { useRouter } from 'next/router'

export default () => {
    const router = useRouter();
    console.log(router.query);

    return (
        <div>
            {router.route.match}
        </div>
    )
}
