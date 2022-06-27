export async function get({ params }) {
    const res = await fetch(`http://127.0.0.1:8984/cbc/meetings/${params.conbavilId}`)
    const meeting = await res.json()
    return {
        body: { meeting }
    }
}