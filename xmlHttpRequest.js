function getData(){
    var xmlHttpRequest = new XMLHttpRequest();

    xmlHttpRequest.open("GET", "data/data.json", true);

    xmlHttpRequest.send();

    xmlHttpRequest.onreadystatechange = () => {
        if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200){
            var categorias = JSON.parse(xmlHttpRequest.responseText).categorias;

            this.showData(categorias);
        }
    }
}

function showData(categorias){
    let parentElement = document.getElementById("result");

    categorias.forEach(element => {
        let child = document.createElement("LI");
        child.innerText = element;
        parentElement.append(child);    
    });
}

window.onerror = (error) => {
    console.log("error 2");
}