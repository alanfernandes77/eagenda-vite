import { IRepository } from "../../shared/interfaces/repository.interface";
import { TaskPriority } from "../models/priority.enum";
import { Task } from "../models/task";
import { TaskRepositoryLocalStorage } from "../repositories/task.repository.local-storage";

class TaskCreatePage {

  private txtTitle: HTMLHeadingElement;
  private txtSubtitle: HTMLHeadingElement;
  private txtDescription: HTMLInputElement;
  private slctPriority: HTMLSelectElement;
  private btnSave: HTMLButtonElement;
  private selectedId: string;

  constructor(private taskRepository: IRepository<Task>, id?: string) {
    this.txtTitle = document.getElementById("title") as HTMLHeadingElement;
    this.txtSubtitle = document.getElementById("subtitle") as HTMLHeadingElement;
    this.txtDescription = document.getElementById("description") as HTMLInputElement;
    this.slctPriority = document.getElementById("priority") as HTMLSelectElement;
    this.btnSave = document.getElementById("btn-save") as HTMLButtonElement;
    
    this.btnSave.addEventListener("click", (_evt) => this.save());

    if (id) {
      this.selectedId = id;

      const selectedTask = this.taskRepository.getById(id);

      if (selectedTask) 
        this.fillForm(selectedTask);
    }
  }

  private save(): void {
    const task = this.getTask();

    if (!this.selectedId) {
      this.taskRepository.insert(task);

      window.location.href = "task.html";
      alert(`Tarefa '${task.description}' (${task.id}) criada com sucesso!`);

    } else {
      this.taskRepository.update(task.id, task);

      window.location.href = "task.html";
      alert(`Tarefa '${task.description}' (${task.id}) editada com sucesso!`);
    } 
  }

  private fillForm(selectedTask: Task): void {
    this.txtDescription.value = selectedTask.description;
    this.slctPriority.value = selectedTask.priority.toString();
    this.txtTitle.innerText = "Edição de Tarefa";
    this.txtSubtitle.innerText = "Preencha os campos abaixo para editar a tarefa selecionada"
  }

  private getTask(): Task {
    const description = this.txtDescription.value;
    const priority = this.slctPriority.value as TaskPriority;

    let task = (this.selectedId) ? new Task(description, priority, this.selectedId) : new Task(description, priority);

    return task;
  }

}

const params = new URLSearchParams(window.location.search);

const id = params.get("id") as string;

new TaskCreatePage(new TaskRepositoryLocalStorage(), id);