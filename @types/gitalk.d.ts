declare module 'gitalk/dist/gitalk-component' {
    type DeepPartial<T> = {
        [P in keyof T]?: DeepPartial<T[P]>
    }
    class GitalkComponent extends React.Component<
        { options: any } & DeepPartial<HTMLDivElement>
    > {}
    export default GitalkComponent
}
