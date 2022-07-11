async function main() {
  const timeChartCanvas = document.querySelector("#time-chart");
  const highestPriceChartCanvas = document.querySelector(
    "#highest-price-chart"
  );
  const averagePriceChartCanvas = document.querySelector(
    "#average-price-chart"
  );
}

async function main() {
  //   //   First, fetch data - returns a promise
  //   const data = await fetch(
  //     "https://api.twelvedata.com/time_series?symbol=GME,MSFT,DIS,BNTX&interval=1min&format=JSON&apikey=011fa0deb1c245a1878a979e4cc62423"
  //   );

  //   // Next, parse the promise by using json()
  //   const dataParsed = await data.json();

  //   // destructuring variables
  //   const { GME, MSFT, DIS, BNTX } = dataParsed;
  //   const stocks = [GME, MSFT, DIS, BNTX];

  // Using mock data for alternative to twelvedata
  const { GME, MSFT, DIS, BNTX } = mockData;
  const stocks = [GME, MSFT, DIS, BNTX];
  console.log(stocks);
}

main();
