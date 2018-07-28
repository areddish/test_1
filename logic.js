const PRESENTER = "Presenter";
const ATTENDEE = "Attendee";
const MAX_IMAGES = 3;

var nodes = {};
var imageCounter = 0;

var createPersonIcon = function(person, role)
{
    let safeName = encodeURI(person.name);
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
    containerNode.setAttribute("onclick", "show('" + safeName + "','" + person.github_username + "')");

    let imageNode = document.createElement("img");
    imageNode.className = "photo";
    imageNode.src = role == PRESENTER ? "images/octo.jpg":  "images/" + imageCounter + ".png";
    imageCounter++;
    imageCounter %= MAX_IMAGES;
    getGithubData(person.github_username)
        .then(json => {
            var url = json["avatar_url"];
            console.log("image" + url);
            imageNode.src = url ? url : "images/octo.jpg";
        });

    let nameNode = document.createElement("div");
    nameNode.className = "name";
    nameNode.innerText = person.name;

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

    getGithubData(username)
        .then(json => {
            const content = document.getElementById("content");
            const name = json["name"];
            const location = json["location"];
            const repoCount = json["public_repos"];
            if (!name && !location && !repoCount) {
                content.innerText = "Couldn't get information for user: " + username;
            }
            else {              
                document.getElementById("popup.name").innerText = "Name: " + name;
                document.getElementById("popup.loc").innerText = "Location: " + location;
                document.getElementById("popup.repos").innerText = "# of public repos: " + repoCount;      
            }
        });    
}

var getGithubData = function(username)
{
    return fetch("https://api.github.com/users/"+username)
        .then(data => data.json())
}