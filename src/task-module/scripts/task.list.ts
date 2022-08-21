import { IRepository } from "../../shared/interfaces/repository.interface";
import { Task } from "../models/task";
import { TaskRepositoryLocalStorage } from "../repositories/task.repository.local-storage";

class TaskListPage {
  private table: HTMLTableElement;

  constructor(private taskRepository: IRepository<Task>) {
    this.table = document.getElementById("task-table") as HTMLTableElement;
    this.updateTable();
  }

  private updateTable(): void {
    const tasks = this.taskRepository.getAll();

    const tableBody = this.table.getElementsByTagName("tbody")[0];

    tasks.forEach(t => {
      const newRow = tableBody.insertRow();

      Object.values(t).forEach((value: any) => {
        const newCell = newRow.insertCell();

        newCell.innerText = value;
      });

      const buttonCells = newRow.insertCell();

      buttonCells.style.display = "flex";
      buttonCells.style.gap = "15px";

      const btnEdit = this.createEditButton(t);
      const btnDelete = this.createDeleteButton(t);

      buttonCells.appendChild(btnEdit);
      buttonCells.appendChild(btnDelete);
    });
  }

  private createEditButton(t: Task) {
    const btnEdit = document.createElement("a");
    btnEdit.innerText = "Editar ";
    btnEdit.className = "button edit";

    btnEdit.addEventListener("click", () => {
      window.location.href = `task.create.html?id=${t.id}`;
    });

    return btnEdit;
  }

  private createDeleteButton(t: Task) {
    const btnDelete = document.createElement("a");

    btnDelete.innerText = "Excluir";
    btnDelete.className = "button delete";

    btnDelete.addEventListener("click", () => {
      this.taskRepository.delete(t.id);

      window.location.reload();
    });
    return btnDelete;
  }
}

new TaskListPage(new TaskRepositoryLocalStorage());