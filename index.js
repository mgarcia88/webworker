
window.onload = () => {
    document.getElementById("result").value = "0";

    createElements();
}

function sendData() {
    if (typeof (Worker) !== "undefined") {
        var myWorker = new Worker("main.js");
        let values = document.getElementById("result").value.split('+');
        values.forEach(element => {
            myWorker.postMessage(element);
        });

        myWorker.onmessage = (e) => {
            document.getElementById("result").value = e.data;
        }
    }
    else {
        console.log("Humm, você não pode executar essa função");
    }
}

function calculate(value) {
    var result = document.getElementById("result").value;
    document.getElementById("result").value = result + "+" + value;
}

function createElements() {
    let elements = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    var calculatorWrapper = document.getElementById("calculator-wrapper");

    elements.forEach(element => {
        let elementCreator = document.createElement("BUTTON");
        elementCreator.setAttribute("type", "button");
        elementCreator.innerText = element;
        elementCreator.onclick = () => {
            calculate(element);
        }
        calculatorWrapper.appendChild(elementCreator);
    });
}

function clear(){
    alert("oie");
    document.getElementById("result").value = "0";
}