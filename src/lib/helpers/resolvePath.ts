export default function resolvePath(obj: object, path: string): string | object | object[] {
    let current = { ...obj }
    path.split('.').forEach(attr => {
        try {
            current = current[attr]
        } catch {
            throw new Error(`resolvePath: cannot get attribute ${attr} from ${current}`)
        }
    })
    return current
}
