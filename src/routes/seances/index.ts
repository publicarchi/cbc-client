export async function get() {
    const response = await fetch('http://127.0.0.1:8984/cbc/meetings')
    const { meetings, meta } = await response.json()
    return {
        body: { meetings, meta }
    }
}