const fetchItems = async (url) => {
    try {
        const result = await fetch(url);
        const data = await result.json();
        return data;
    } catch (err) {
        console.log('Error: ', err);
    }
}

//1000 -> debouce(fetchItems, 1000)
const debouce = (func, delay) => {
    if (typeof func !== 'function') {
        throw new Error(`Not a valid func ${func}`);
    }
    if (typeof delay != 'number' || delay < 0) {
        throw new Error(`Not a valid delay ${delay}`);
    }

    //c  h   i
    //0 100 200 300 400 ------ 1000
    let timeout;
    return (...args) => {
        return new Promise((resolve) => {
            window.clearTimeout(timeout);
            timeout = window.setTimeout(async () => {
                const data = await func(...args);
                resolve(data);
            }, delay)
        })
    }
}

const debouceQuery = debouce(fetchItems, 1000);
export default debouceQuery;
