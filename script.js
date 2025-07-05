const displayTasks = document.querySelector(".task-wrapper");
const form = document.querySelector("form");
const inputValue = document.querySelector("input");
const taskNum = document.querySelector(".task-num span");
const categories = document.querySelectorAll(".status p");
const clearTask = document.querySelector(".clear-task");
const moon = document.querySelector(".moon");
const sun = document.querySelector(".sun");
let tasks = [];

//submit task
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const task = { id: crypto.randomUUID(), text: "", status: "active" };
  task["text"] = inputValue.value;
  tasks.push(task);
  dispplayData();
  inputValue.value = "";
});

categories.forEach((category) => {
  category.addEventListener("click", (event) => {
    // Remove color from all categories
    categories.forEach((cat) => (cat.style.color = ""));
    // Add color to the clicked category
    event.target.style.color = "hsl(220, 98%, 61%)";
    let category = event.target.textContent.toLowerCase();
    dispplayData(category);
  });
});

//display task
function dispplayData(category) {
  if (category === undefined) {
    categories.forEach((cat) => {
      if (cat.textContent.toLowerCase() === "all") {
        cat.style.color = "hsl(220, 98%, 61%)";
      } else {
        cat.style.color = "";
      }
    });
  }
  let filteredData =
    category === undefined
      ? tasks
      : category === "all"
      ? tasks
      : tasks.filter((cat) => cat.status === category);

  displayTasks.innerHTML = filteredData
    .map((task) => {
      return `<div class="task"> 
              <div>
                <div class="check${
                  task.status === "completed" ? " checked" : ""
                }" data-id="${task.id}">
                  <img src="images/icon-check.svg" alt="check" />
                </div>
                <p class="${task.status === "completed" ? "strike" : ""}" >${
        task.text
      }</p>
              </div>
              <div class="delete">
                <img src="images/icon-cross.svg" alt="cross" />
              </div>
            </div>`;
    })
    .join("");
  const check = document.querySelectorAll(".check");
  completeTask(check);
  const deletebtn = document.querySelectorAll(".delete");
  deleteTask(deletebtn);
  // clearCompletedTask(filteredData);
  taskNum.textContent = tasks.length;
}

//logic to mark text complete
function completeTask(check) {
  check.forEach((checkEl) => {
    checkEl.addEventListener("click", (event) => {
      const checkDiv = event.target.closest(".check");
      const taskId = checkDiv.getAttribute("data-id");
      let task = tasks.find((t) => t.id === taskId);
      if (task) {
        task.status = task.status === "completed" ? "active" : "completed";
        dispplayData();
      }
    });
  });
}

//delete task
function deleteTask(deletebtn) {
  deletebtn.forEach((del) => {
    del.addEventListener("click", (event) => {
      const parentDiv = event.target.parentElement.parentElement;
      const textP = parentDiv.querySelector("p").textContent;
      const deltext = tasks.find((text) => text.text === textP);

      const index = tasks.findIndex((task) => task.id === deltext.id);
      if (index !== -1) {
        tasks.splice(index, 1);
      }
      // console.log(tasks);
      dispplayData();
    });
  });
}

//Clear completed task
function clearCompletedTask() {
  clearTask.addEventListener("click", () => {
    console.log("click");
    let completedTask = tasks.filter((task) => task.status !== "completed");
    tasks = completedTask;
    dispplayData();
  });
}
clearCompletedTask();

//logic to handle dark theme
moon.addEventListener("click", () => {
  moon.style.display = "none";
  sun.style.display = "block";
  document.body.classList.add("darkmode");
});
sun.addEventListener("click", () => {
  sun.style.display = "none";
  moon.style.display = "block";
  document.body.classList.remove("darkmode");
});
