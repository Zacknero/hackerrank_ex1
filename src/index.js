'use strict';

const https = require('https');

async function getStockInformation(date) {
    const api = `https://jsonmock.hackerrank.com/api/stocks?date=${date}`

    if (!!date.substring(0, 1).match('0')) {
        return {};
    }

    return await new Promise(resolve => {
        https.get(api, res => {
            let rawData = '';
            res.on('data', (chunck) => {
                rawData += chunck;
            })

            res.on('end', () => {
                const obj = JSON.parse(rawData);
                if(obj.page === 1 && !!obj.data[0]){
                    const data = obj.data[0];
                    const output = {
                        open: data.open,
                        high: data.high,
                        low: data.low,
                        close: data.close
                    }
                    resolve(output);
                } else {
                    resolve({})
                }
            })

        })
    })
}

async function main() {

    const date = '5-January-2000';

    const result = await getStockInformation(date);
    const isEmpty = !Object.keys(result).length;

    if (isEmpty) {
        console.log('No Results Found');
    } else {
        console.log(`Open: ${result.open}\n`);
        console.log(`High: ${result.high}\n`);
        console.log(`Low: ${result.low}\n`);
        console.log(`Close: ${result.close}\n`);
    }
}
main().then(r => console.log(r));
