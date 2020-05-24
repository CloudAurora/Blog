import moment from 'moment'
import { highlightjs } from 'types'

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


export const isServer = () => typeof window === 'undefined';


export const getPostHeadingImage = (id: number) => {
    const index = (id - 1) % 11 + 1;
    return `/static/post-heading-${index}.jpg`;
}


export function hljsDefineGraphQL(fn: typeof highlightjs) {
    return {
      aliases: ["gql"],
      keywords: {
        keyword:
          "query mutation subscription|10 type interface union scalar fragment|10 enum on ...",
        literal: "true false null"
      },
      contains: [
        fn.HASH_COMMENT_MODE,
        fn.QUOTE_STRING_MODE,
        fn.NUMBER_MODE,
        {
          className: "type",
          begin: "[^\\w][A-Z][a-z]",
          end: "\\W",
          excludeEnd: true
        },
        {
          className: "literal",
          begin: "[^\\w][A-Z][A-Z]",
          end: "\\W",
          excludeEnd: true
        },
        { className: "variable", begin: "\\$", end: "\\W", excludeEnd: true },
        {
          className: "keyword",
          begin: "[.]{2}",
          end: "\\."
        },
        {
          className: "meta",
          begin: "@",
          end: "\\W",
          excludeEnd: true
        }
      ],
      illegal: /([;<']|BEGIN)/
    };
  }