/**
 * return a default limit of 100
 * @returns : crypto data => { data: [], timestamp: number }
 */
export async function getAllAssets(limit=60) {
    // hit endpoint
    const response = await fetch(`https://api.coincap.io/v2/assets?limit=${limit}`);
    // if !200 OK
    if(!response.ok) throw new Error(`Error: ${response.status}`);
    // if 200 OK
    const result = response.json();
    // return data
    return result;
}

/**
 * return one asset data
 * @param: assetId => e.g: bitcoin
 * @returns : crypto data => { data: {}, timestamp: number }
 */
export async function getOneAsset(assetId) {
    // hit endpoint
    const response = await fetch(`https://api.coincap.io/v2/assets/${assetId}`);
    // if !200 OK
    if(!response.ok) throw new Error(`Error: ${response.status}`);
    // if 200 OK
    const result = response.json();
    // return data
    return result;
}

/**
 * return history data for a given interval
 * @param: assetId => e.g: bitcoin
 * @param: interval => choices are: "m1, m5, m15, m30, h1, h2, h6, h12, d1"
 * @returns : {
 *      "priceUsd": "29703.7480185082522156",
 *      "time": 1654300800000,
 *      "date": "2022-06-04T00:00:00.000Z"
 * }
 */
export async function getAssetHistory(assetId, interval="d1") {
    // hit endpoint
    const response = await fetch(`https://api.coincap.io/v2/assets/${assetId}/history?interval=${interval}`);
    // if !200 OK
    if(!response.ok) throw new Error(`Error: ${response.status}`);
    // if 200 OK
    const result = response.json();
    // return data
    return result;
}