const labelss = ['janvier', 'fevrier', 'mars', 'avril', 'mai', 'juin', 'juillet', 'aout', 'septembre', 'octobre', 'novembre', 'decembre'];
const datas = {
    labels: labelss,
    datasets: [{
        label: 'My First Dataset',
        data: lineData,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
    }]
};
const configs = {
    type: 'line',
    data: datas,
};
var ctx = document.getElementById("lineChart").getContext("2d");
var myNewChart = new Chart(ctx, configs);