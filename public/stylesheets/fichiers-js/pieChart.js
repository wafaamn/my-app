var optionsPie = {
    layout: {
        padding: {
            left: 0, right: 500, bottom: 100,
        }
    },
    responsive: true,
    scaleBeginAtZero: true,
    legend: {
        display: false
    },
};
const data = {
    labels: [
        'femme',
        'homme'
    ],
    datasets: [{
        label: '',
        data: chartData,
        backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)'
        ],
        hoverOffset: 0
    }]
};
const config = {
    type: 'pie',
    data: data,
    options: optionsPie,
};
var ctx = document.getElementById("myChart").getContext("2d");
var myNewChart = new Chart(ctx, config);