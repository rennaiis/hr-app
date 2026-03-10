export async function getEmployees() {
    const res = await fetch('http://localhost:3000')
    return res.json()
}