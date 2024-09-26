import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { TodoService, Todo } from '../services/todo.service';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  tasks: Todo[] = [];
  filteredTasks: Todo[] = [];
  newTask: string = '';
  selectedTask: Todo | null = null;
  filterValue: string = 'all';
  errorMessage: string = '';

  constructor(
    private todoService: TodoService,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.todoService.getTodos().subscribe(
      (data) => {
        this.tasks = data;
        this.applyFilter();
      },
      (error) => {
        this.toastr.error('Error al cargar las tareas', error.message);
      }
    );
  }

  openModal(task: Todo) {
    this.selectedTask = { ...task };
  }

  saveTaskChanges() {
    if (this.selectedTask) {
      this.todoService.updateTodo(this.selectedTask.id!, this.selectedTask).subscribe(
        () => {
          this.toastr.success('Tarea actualizada');
          this.closeModal();
          this.loadTasks(); // Recargar tareas para ver los cambios
        },
        (error) => {
          this.toastr.error('Error al actualizar la tarea', error.message);
        }
      );
    }
  }

  closeModal() {
    this.selectedTask = null;
  }

  addTask() {
    if (this.newTask.trim()) {
      const newTodo: Todo = { name: this.newTask, completed: false, description: '' };
      this.todoService.createTodo(newTodo).subscribe(
        (response) => {
          const todo = response.todoItem;
          this.tasks.push(todo);
          this.newTask = '';
          this.applyFilter();
          this.toastr.success('Tarea creada');
          this.cdr.detectChanges(); 
        },
        (error) => {
          this.toastr.error('Error al crear tarea', error.message);
        }
      );
    }
  }

  deleteTask(task: Todo) {
    this.todoService.deleteTodo(task.id!).subscribe(
      () => {
        this.tasks = this.tasks.filter(t => t.id !== task.id);
        this.toastr.success('Tarea eliminada');
        this.applyFilter();
      },
      (error) => {
        this.toastr.error('Error al eliminar tarea', error.message);
      }
    );
  }

  saveTask(task: Todo) {
    task.completed = !task.completed;
    this.todoService.updateTodo(task.id!, task).subscribe(
      () => {
        this.toastr.success('Tarea actualizada');
        this.loadTasks();
      },
      (error) => {
        this.toastr.error('Error al actualizar la tarea', error.message);
      }
    );
  }

  applyFilter() {
    if (this.filterValue === 'all') {
      this.filteredTasks = this.tasks;
    } else if (this.filterValue === 'completed') {
      this.filteredTasks = this.tasks.filter(task => task.completed);
    } else if (this.filterValue === 'pending') {
      this.filteredTasks = this.tasks.filter(task => !task.completed);
    }
  }

  onFilterChange(event: any) {
    this.filterValue = event.target.value;
    this.applyFilter();
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
