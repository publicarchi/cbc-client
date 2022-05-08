export type ExpandedRowOptionsType =  {
    head: string
    type: 'meta' | 'list'
    content: { key: string, value: string }[] | string
    link?: { path: string, slug:string, text:string }
}[]
