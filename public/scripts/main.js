
window.onload = function() {

    console.log("Done");

    var content = document.getElementById("main");
    
    var apiPath = "/dictionary-api";
    var xhr;

    if(XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else if(ActiveXObject) {
        xhr = new ActiveXObject();
    }

    xhr.open('GET', apiPath, true);

    xhr.onload = function() {
        
        var api = JSON.parse(this.responseText);

        for(var vals of api) {
            var titleNode = document.createElement("h2");
            titleNode.setAttribute("class", "titles");
            titleNode.innerHTML = vals.title;

            var contentNode = document.createElement("p");
            contentNode.setAttribute("class", "descriptions");
            contentNode.innerHTML = vals.description;

            content.appendChild(titleNode);
            content.appendChild(contentNode);
        } 
    };

    xhr.send();

    send.onclick = function() {

        var send = document.getElementById("send");
        var terms = document.getElementById("term");
        var desc = document.getElementById("desc");
        var xhr;
    
        var param = terms.getAttribute("name") + "=" + terms.value + "&" + desc.getAttribute("name") + "=" + desc.value;
    
        if(XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else if(ActiveXObject) {
            xhr = new ActiveXObject();
        }
    
        xhr.open('POST', apiPath, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    
        xhr.send(param);
    };
};

