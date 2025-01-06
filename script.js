let data = [
    {
        id: 1,
        name: "GYM",
        status: true,
    },
    {
        id: 2,
        name: "STUDY",
        status: false,
    },
    {
        id: 3,
        name: "SHOPPING",
        status: false,
    },
];

function card(item, index) {
    const carddiv = document.createElement("div");
    const child = document.createElement("div");

    const srno = document.createElement("div");
    srno.innerHTML = index + 1;

    const title = document.createElement("p");
    const status = document.createElement("span");
    const deleted = document.createElement("span");
    deleted.style.color = "red";
    deleted.style.fontSize = "12px";
    deleted.style.cursor = "pointer";
    deleted.innerHTML = " Delete Now";

    title.innerHTML = item.name;
    carddiv.setAttribute("id", item.id);

    status.innerHTML = statusstring(item.status);

    const color = item.status ? "#b3ffb3" : "#ffb3b3";

    child.style.background = color;
    child.style.display = "flex";
    child.style.padding = "4px 24px";
    child.style.alignItems = "center";
    child.style.marginBottom = "4px";
    child.style.justifyContent = "space-between";
    child.style.gap = "4px";
    child.style.border = "1px solid #000";
    child.style.width = "320px";

    child.appendChild(srno);
    child.appendChild(title);
    child.appendChild(status);
    child.appendChild(deleted);

    deleted.addEventListener("click", () => deleting(item.id));
    status.addEventListener("click", () => {
        if (!item.status) {
            updatingStatus(item.id)
        }
    })

    carddiv.appendChild(child);
    return carddiv;
}

function statusstring(status) {
    return status ? "Done" : "Pending";
}

function renderCards() {
    const root = document.getElementById("root");
    root.innerHTML = "";

    const appName = document.createElement("h3");
    appName.innerHTML = "TODO Application";
    root.appendChild(appName);

    const input = document.createElement("input")
    input.setAttribute("type", "text")
    input.setAttribute("name", "todoname")
    input.setAttribute("id", "todoname")
    root.appendChild(input)

    const submit = document.createElement("button")
    submit.setAttribute("type", "submit")
    submit.style.marginBottom = '12px'
    submit.style.marginLeft = '12px'
    submit.textContent = "Submit"
    submit.addEventListener("click", () => createList())
    root.appendChild(submit)

    data.forEach((item, index) => {
        const cardElement = card(item, index);
        root.appendChild(cardElement);
    });
}

function deleting(id) {
    const indexToDelete = data.findIndex((item) => item.id === id);

    if (indexToDelete !== -1) {
        data.splice(indexToDelete, 1);
    }
    renderCards();
}

function updatingStatus(id) {
    data[(id - 1)].status = true
    renderCards()
}

function createList() {
    const name = document.getElementById("todoname")
    const value = name.value

    const payload = {
        id: data.length + 1,
        name: value,
        status: false
    }
    data.push(payload)
    renderCards()
}

renderCards();
