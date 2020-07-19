import any from '*.jpg'

declare module '*.less' {
    const classes: { [key: string]: string }
    export default classes
}
declare module '*.css' {
    const classes: { [key: string]: string }
    export default classes
}

declare module '*.jpg' {
    export default any
}
