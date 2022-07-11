async function main() {
  const timeChartCanvas = document.querySelector("#time-chart");
  const highestPriceChartCanvas = document.querySelector(
    "#highest-price-chart"
  );
  const averagePriceChartCanvas = document.querySelector(
    "#average-price-chart"
  );

  //   // Fetching daily data
  //   const data = await fetch(
  //     "https://api.twelvedata.com/time_series?symbol=GME,MSFT,DIS,BNTX&interval=1day&format=JSON&apikey=011fa0deb1c245a1878a979e4cc62423"
  //   );

  //   // Parsing promise by using json()
  //   const dataParsed = await data.json();

  //   // destructuring variables
  //   const { GME, MSFT, DIS, BNTX } = dataParsed;
  //   const stocks = [GME, MSFT, DIS, BNTX];

  // Using mock data for alternative to twelvedata
  const { GME, MSFT, DIS, BNTX } = mockData;
  const stocks = [GME, MSFT, DIS, BNTX];

  stocks.forEach((stock) => stock.values.reverse());

  // Creating time-chart
  new Chart(timeChartCanvas.getContext("2d"), {
    type: "line",
    data: {
      labels: stocks[0].values.map((value) => value.datetime),
      datasets: stocks.map((stock) => ({
        label: stock.meta.symbol,
        data: stock.values.map((value) => parseFloat(value.high)),
        backgroundColor: getColor(stock.meta.symbol),
        borderColor: getColor(stock.meta.symbol),
      })),
    },
  });
}

function getColor(stock) {
  if (stock === "GME") {
    return "rgba(61, 161, 61, 0.7)";
  }
  if (stock === "MSFT") {
    return "rgba(209, 4, 25, 0.7)";
  }
  if (stock === "DIS") {
    return "rgba(18, 4, 209, 0.7)";
  }
  if (stock === "BNTX") {
    return "rgba(166, 43, 158, 0.7)";
  }
}

main();
