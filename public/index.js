async function main() {
  // Fetching daily data
  const data = await fetch(
    "https://api.twelvedata.com/time_series?symbol=GME,MSFT,DIS,BNTX&interval=1day&format=JSON&apikey=011fa0deb1c245a1878a979e4cc62423"
  );

  // Parsing promise by using json()
  const dataParsed = await data.json();

  // destructuring variables
  const { GME, MSFT, DIS, BNTX } = dataParsed;
  const stocks = [GME, MSFT, DIS, BNTX];

  stocks.forEach((stock) => stock.values.reverse());
  console.log(stocks);

  // Creating time-series chart
  const timeChartCanvas = document.querySelector("#time-chart");
  new Chart(timeChartCanvas.getContext("2d"), {
    type: "line",
    data: {
      labels: stocks[0].values.map((value) => value.datetime),
      datasets: stocks.map((stock) => ({
        label: stock.meta.symbol,
        data: stock.values.map((value) => parseFloat(value.high)),
        backgroundColor: getColor(stock.meta.symbol),
        borderColor: getColor(stock.meta.symbol),
        tension: 0.2,
        pointRadius: 0,
      })),
    },
  });

  // Creating highest-stock price chart
  const highestPriceChartCanvas = document.querySelector(
    "#highest-price-chart"
  );
  new Chart(highestPriceChartCanvas.getContext("2d"), {
    type: "bar",
    data: {
      labels: stocks.map((stock) => stock.meta.symbol),
      datasets: [
        {
          label: "Highest",
          data: stocks.map((item) => getMaxValue(item.values)),
          backgroundColor: stocks.map((stock) => getColor(stock.meta.symbol)),
          borderColor: stocks.map((stock) => getColor(stock.meta.symbol)),
        },
      ],
    },
  });

  // Creating average stock price chart
  const averagePriceChartCanvas = document.querySelector(
    "#average-price-chart"
  );
  new Chart(averagePriceChartCanvas.getContext("2d"), {
    type: "pie",
    data: {
      labels: stocks.map((stock) => stock.meta.symbol),
      datasets: [
        {
          label: "Highest",
          data: stocks.map((item) => getMeanValue(item.values)),
          backgroundColor: stocks.map((stock) => getColor(stock.meta.symbol)),
          borderColor: stocks.map((stock) => getColor(stock.meta.symbol)),
        },
      ],
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

function getMaxValue(stock) {
  let maxValue = 0;
  stock.forEach((item) => {
    if (parseFloat(item.high) > maxValue) {
      maxValue = item.high;
    }
  });
  return maxValue;
}

function getMeanValue(stock) {
  let totalValue = 0;
  stock.forEach((item) => {
    totalValue += parseFloat(item.high);
  });
  return totalValue / stock.length;
}

main();
