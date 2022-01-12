async function main() {
    let response = await fetch("https://api.twelvedata.com/time_series?symbol=GME,MSFT,DIS,BNTX&interval=1day&apikey=c5d3977f541946bb95b6bfa9e186704f")
    let result = await response.json()
    const { GME, MSFT, DIS, BNTX } = result
    const stocks = [ GME, MSFT, DIS, BNTX ]
    console.log(stocks)
    // let stockPrices = stocks[0].values.map( stock => parseFloat(stock.high))
    // determineHighest(stockPrices)
    // console.log(highestStockPrice)
    
    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');
    
    stocks.forEach( stock => stock.values.reverse())
    
    var timeChart = new Chart(document.getElementById('time-chart').getContext('2d'), {
        type: 'line',
        data: {
            labels: stocks[0].values.map(value => value.datetime),
            datasets: stocks.map( stock => ({
                label: stock.meta.symbol,
                data: stock.values.map(value => parseFloat(value.high)),
                backgroundColor: [
                    determineColor(stock.meta.symbol),
                ],
                borderColor: [
                    determineColor(stock.meta.symbol),
                ],
                borderWidth: 1
            }))
        },
    });
    
    let highPriceArr = []
    for ( let i = 0 ; i < stocks.length ; i++) {
        highestStockPrice = 0
        let stockPrices = stocks[i].values.map( stock => parseFloat(stock.high))
        determineHighest(stockPrices)
        highPriceArr.push(highestStockPrice)
    }
    var highestPriceChart = new Chart(document.getElementById('highest-price-chart').getContext('2d'), {
        type: 'bar',
        data: {
            labels: stocks.map(value => value.meta.symbol),
            datasets: [{
                label: "Highest",
                data: highPriceArr,
                backgroundColor: [
                    "rgba(61, 161, 61, 0.7)"
                    // determineColor(stock.meta.symbol),
                ],
                borderColor: [
                    "rgba(61, 161, 61, 0.7)"
                    // determineColor(stock.meta.symbol),
                ],
                borderWidth: 1
            }]
        },
    });
}

function determineColor(stock) {
    if(stock === "GME") {
        return "rgba(61, 161, 61, 0.7)"
    }
    if(stock === "MSFT") {
        return "rgba(209, 4, 25, 0.7)"
    }
    if(stock === "DIS") {
        return "rgba(18, 4, 209, 0.7)"
    }
    if(stock === "BTNX") {
        return "rgba(166, 43, 158, 0.7)"
    }
    
}

let highestStockPrice = 0
function determineHighest(stockPrice) {
    stockPrice.forEach( price => {
        if (price > highestStockPrice) {
            highestStockPrice = price
        }
    })
}

main()