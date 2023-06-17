/**
 * return a default limit of 100
 * @returns : crypto data => { Data: [], ... }
 */
export async function getAllNews() {
    // hit endpoint
    const response = await fetch(`https://min-api.cryptocompare.com/data/v2/news/`);
    // if !200 OK
    if(!response.ok) throw new Error(`Error: ${response.status}`);
    // if 200 OK
    const result = response.json();
    // return data
    return result;
}