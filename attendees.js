const PRESENTER = "Presenter";
const FOUNDER = "Founder";
const ATTENDEE = "Attendee";

var attendees = [
    { "name": "Andrew", "role": PRESENTER },
    { "name": "Shijit", "role": FOUNDER },
    { "name": "Joel", "role": PRESENTER },
    { "name": "You", "role": ATTENDEE },
    { "name": "Yodu", "role": ATTENDEE },
    { "name": "You", "role": ATTENDEE },
    { "name": "Yosu", "role": ATTENDEE },
    { "name": "Ysou", "role": ATTENDEE },
    { "name": "You", "role": ATTENDEE },
    { "name": "Yosssssssssssssu", "role": ATTENDEE },
    { "name": "You", "role": ATTENDEE },
];

var nodes = {};

var createPersonIcon = function(name, role)
{
    const rolesMap = {
        [PRESENTER]: "images/1.png",
        [FOUNDER] : "images/3.png",
        [ATTENDEE]: "images/4.png"
    }

    let safeName = encodeURI(name);
    if (nodes[safeName] !== undefined) {
        nodes[safeName] += 1;
        safeName += nodes[safeName];
    }
    else {
        nodes[safeName] = 0;
    }

    let containerNode = document.createElement("div");
    containerNode.id = safeName;
    containerNode.className = "person";
    containerNode.setAttribute("onclick", "show('" + safeName + "')");

    let imageNode = document.createElement("img");
    imageNode.className = "photo";
    imageNode.src = role == PRESENTER ? "images/octo.jpg":  "images/4.png";

    let nameNode = document.createElement("div");
    nameNode.className = "name";
    nameNode.innerText = name;

    containerNode.appendChild(imageNode);
    containerNode.appendChild(nameNode);
    return containerNode;
}

var show = function(name)
{    
    let nodes = document.getElementsByClassName("person");
    for (let i = 0;i < nodes.length; i++){
        const node = nodes[i];
        console.log(node.className);
        if (node.classList)  
            node.classList.remove("selected");
    }

    let seletected = document.getElementById(name);
    seletected.classList.add("selected");
}