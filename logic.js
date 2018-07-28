const PRESENTER = "Presenter";
const ATTENDEE = "Attendee";
const MAX_IMAGES = 3;

var nodes = {};
var imageCounter = 0;

var createPersonIcon = function(name, role)
{
    let safeName = encodeURI(name);
    if (nodes[safeName] !== undefined) {
        nodes[safeName] += 1;
        safeName += nodes[safeName];
    }
    else {
        nodes[safeName] = 0;
    }
    //console.log(nodes)
    let containerNode = document.createElement("div");
    containerNode.id = safeName;
    containerNode.className = "person";
    containerNode.setAttribute("onclick", "show('" + safeName + "')");

    let imageNode = document.createElement("img");
    imageNode.className = "photo";
    imageNode.src = role == PRESENTER ? "images/octo.jpg":  "images/" + imageCounter + ".png";
    imageCounter++;
    imageCounter %= MAX_IMAGES;

    let nameNode = document.createElement("div");
    nameNode.className = "name";
    nameNode.innerText = name;

    containerNode.appendChild(imageNode);
    containerNode.appendChild(nameNode);
    return containerNode;
}

var hide = function()
{
    unselectAll();
    const popup = document.getElementById("popup");
    popup.style.display = "none";
}

var unselectAll = function(){
    let nodes = document.getElementsByClassName("person");
    for (let i = 0;i < nodes.length; i++){
        const node = nodes[i];
        console.log(node.className);
        if (node.classList)  
            node.classList.remove("selected");
    }
}
var show = function(id, username)
{    
    unselectAll();

    const seletected = document.getElementById(id);
    seletected.classList.add("selected");

    const popup = document.getElementById("popup");
    popup.style.display = "inline";

    content.innerText = "Make a change here!";
}