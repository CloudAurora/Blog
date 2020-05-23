import moment from 'moment'

export function serilization<T extends Record<string, any>>(obj: T): T {
    let newObj: any = {}
    Object.keys(obj).forEach((key) => {
        let value = obj[key]
        if (value !== null) {
            // If array, loop...
            if (Array.isArray(value)) {
                value = value.map((item) => serilization(item))
            }
            // ...if property is date/time, stringify/parse...
            else if (
                typeof value === 'object' &&
                typeof value.getMonth === 'function'
            ) {
                const date = moment(value)
                value = date.format('YYYY-MM-DDTHH:mm:ssZ')
            }
            // ...and if a deep object, loop.
            else if (typeof value === 'object') {
                value = serilization(value)
            }
        }
        newObj[key] = value
    })
    return newObj
}


export const useLinkComponent = () => {
    
}