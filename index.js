async function saveData() {
    let options = {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify({    // the json can not take as string it takes only objects
            "task": task_n.value // it is used to get input entered values
        })
    }
    let response = await fetch("https://dorian-wise-brother.glitch.me/time-table", options);

    if (response.ok) {
        task_n.value = '';
        getData();
    }
}

async function getData() {
    let response = await fetch("https://dorian-wise-brother.glitch.me/time-table");
    let data = await response.json();
    displayData(data);
}
function displayData(data) {
    let container = document.getElementById("container");
    container.innerText = ``;
    data.forEach(obj => {
        let item = document.createElement("div");
        item.innerHTML = `
            <p>${obj.task}</p>
            <button onclick='deleteData("${obj.id}")'><i class="bi bi-trash3"></i></button>
        `;
        container.appendChild(item);
    });
}

async function deleteData(id) {
    let options = {
        "method": "DELETE"
    }
    let response = await fetch(`https://dorian-wise-brother.glitch.me/time-table/${id}`, options);
    if (response.ok) {
        console.log("Deleted");
        getData();
    }
}


async function deleteAllData() {
    let response = await fetch("https://dorian-wise-brother.glitch.me/time-tablegi", { method: "GET" });
    let data = await response.json();
    data.forEach(obj => deleteData(obj.id));
}
getData();