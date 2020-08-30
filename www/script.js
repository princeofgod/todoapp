//Declaring variables of the properties.

let addBtn = document.getElementById("addbtn");
let todotext = document.getElementById("task");
let deletebtn = document.querySelectorAll(".delete");

// Event listener for the add button
addBtn.addEventListener("click", add);

/* Creates and Adds Task to the container
 * Creates a div, p and a button element and appends them to the div(bottom)
 */
function add() {
  if (!todotext.value) {
    alert("No task entered, please enter task!");
  } else {
    //Creates element for the new task to be added.
    let div = document.createElement("div");
    let p = document.createElement("p");
    let neBtn = document.createElement("button");
    let newTask = document.createTextNode(todotext.value);
    let wrong = "&#10008";

    //Appends all created elements.
    document.querySelector(".bottom").appendChild(div);
    div.appendChild(p);
    p.appendChild(newTask);
    div.append(neBtn);
    neBtn.innerHTML = wrong;

    //Adding attributes to created elements
    div.classList.add("list");
    neBtn.classList.add("deleted");

    //Saving to local storage.
    let tasks = JSON.parse(localStorage.getItem("todolist"));
    tasks = tasks ? tasks : [];

    if (tasks.indexOf(todotext.value) === -1) {
      tasks.push(todotext.value);
      localStorage.setItem("todolist", JSON.stringify(tasks));
      todotext.value = "";
      alert("saved successfully!");
    } else {
    }
  }
}

//gets data from the local storage
function getData() {
  JSON.parse(localStorage.getItem("todolist")).forEach((element) => {
    let div = document.createElement("div");
    let p = document.createElement("p");
    let newTask = document.createTextNode(element);
    div.appendChild(p);
    div.classList.add("list");
    p.appendChild(newTask);
    let text = document.createTextNode(newTask);

    document.querySelector(".bottom").appendChild(div);
    div.appendChild(p);

    let neBtn = document.createElement("button");
    let wrong = "&#10008";
    neBtn.innerHTML = wrong;
    div.append(neBtn);
    neBtn.classList.add("deleted");
  });
}

/*
 *Handling the events for both delete button.
 * bottomdiv is the grand-parent node of the buttons.
 */
const bottomdiv = document.querySelector(".bottom");

/*The delete button onclick event
 * Deletes the task whose delete button is clicked.-
 */
bottomdiv.addEventListener("click", (el) => {
  if (event.target.classList == "deleted") {
    const text = el.target.parentNode.firstChild.innerHTML;
    const myList = JSON.parse(localStorage.getItem("todolist"));
    myList.splice(myList.indexOf(text), 1);
    localStorage.setItem("todolist", JSON.stringify(myList));
    event.target.parentNode.remove();
  }
});
