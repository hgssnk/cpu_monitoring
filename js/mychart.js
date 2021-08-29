// csvを配列に変換
function csvToArray(csv) {
    var array = [];
    var lines = csv.split("\n");
    for (var i = 0; i < lines.length; ++i) {
        var cells = lines[i].split(",");
        array.push(cells);
    }
    return array;
}

// 配列からチャートを生成
function arrayToChart(array) {
    var data1 = [], data2 = [];
    for (var row in array) {
        data1.push(array[row][0])
        data2.push(array[row][1])
    }
    var ctx = document.getElementById("myChart").getContext("2d");
    var myChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: data1,
            datasets: [{
                label: "cpu temp [m℃]",
                fill: false,
                borderColor: 'rgba(0, 0, 255, 0.5)',
                data: data2
            }],
        },
        options: {
            scales: {
                xAxes: [{
                    ticks: {
                        minRotation: 0,
                        maxRotation: 0,
                        maxTicksLimit: 10
                    },
                }]
            }
        }
    });
}

// 主処理
function main() {
    let datea = document.getElementById('datetxt');
    let date = datea.value;
    var req = new XMLHttpRequest();
    var filePath = '../log/' + date + '.log';
    req.open("GET", filePath, true);
    req.onload = function () {
        data = csvToArray(req.responseText);
        arrayToChart(data);
    }
    req.send(null);
}
