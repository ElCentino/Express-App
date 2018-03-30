
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
            titleNode.setAttribute("id", "title");
            titleNode.innerHTML = vals.title;

            var contentNode = document.createElement("p");
            contentNode.setAttribute("class", "descriptions");
            contentNode.innerHTML = vals.description;

            content.appendChild(titleNode);
            content.appendChild(contentNode);
        } 
    };

    xhr.onloadend = function() {

       listeners();
    };

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

        xhr.onload = function() {
            var api = JSON.parse(this.responseText);
            main.innerHTML = "";
            for(var vals of api) {
                var titleNode = document.createElement("h2");
                titleNode.setAttribute("class", "titles");
                titleNode.setAttribute("id", "title");
                titleNode.innerHTML = vals.title;

                var contentNode = document.createElement("p");
                contentNode.setAttribute("class", "descriptions");
                contentNode.innerHTML = vals.description;

                content.appendChild(titleNode);
                content.appendChild(contentNode);

                listeners();
            } 
        };
    
        xhr.open('POST', apiPath, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    
        xhr.send(param);
    };

   

    xhr.send();

    function listeners() {
        var titles = document.getElementsByClassName("titles");
        var title = document.getElementById("title");


        for(var i = 0; i < titles.length; i++) {

            (function(index) {

                titles[index].addEventListener('dblclick', function() {

                    if(XMLHttpRequest) {
                        xhr = new XMLHttpRequest();
                    } else if(ActiveXObject) {
                        xhr = new ActiveXObject();
                    }

                    xhr.open('DELETE', `${apiPath}/${titles[index].innerHTML}`, true);

                    xhr.send();
                });
            })(i);
            
        }
    }
};



