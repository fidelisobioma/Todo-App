const displayTasks = document.querySelector(".task-wrapper");
const form = document.querySelector("form");
const inputValue = document.querySelector("input");
const tasks = [];

//submit task
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const task = { id: crypto.randomUUID(), text: "", status: "" };
  task["text"] = inputValue.value;
  tasks.push(task);
  dispplayData();
  inputValue.value = "";
});

//display task
function dispplayData() {
  displayTasks.innerHTML = tasks
    .map((task) => {
      return `<div class="task">
              <div>
                <div class="check">
                  <img src="images/icon-check.svg" alt="check" />
                </div>
                <p>${task.text}</p>
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
}

//logic to mark text
function completeTask(check) {
  check.forEach((checkEl) => {
    checkEl.addEventListener("click", (event) => {
      const checkDiv = event.target.closest(".check");
      checkDiv.classList.toggle("checked");
      //mark task complete
      const parentDiv = checkDiv.parentElement;
      const textP = parentDiv.querySelector("p").textContent;
      const strike = parentDiv.querySelector("p");
      let completed = tasks.find((comp) => comp.text === textP);
      if (completed["status"] === "") {
        completed["status"] = "completed";
        strike.classList.add("strike");
      } else {
        completed["status"] = "";
        strike.classList.remove("strike");
      }
      // console.log(tasks);
      // dispplayData();
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

console.log(tasks);
