const displayTasks = document.querySelector(".task-wrapper");
const form = document.querySelector("form");
const inputValue = document.querySelector("input");
const tasks = [];
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const task = { id: crypto.randomUUID(), text: "", status: "" };
  task["text"] = inputValue.value;
  tasks.push(task);
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
  inputValue.value = "";

  const check = document.querySelectorAll(".check");
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
        completed["status"] = "active";
        strike.classList.add("strike");
      } else {
        completed["status"] = "";
        strike.classList.remove("strike");
      }
      // console.log(tasks);
    });
  });
});

// console.log(text);
