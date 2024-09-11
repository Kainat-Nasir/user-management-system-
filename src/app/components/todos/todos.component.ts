import { Component, OnInit } from '@angular/core';
import { TodoService, Todo } from '../../services/todo.service';
import { MatTableDataSource } from '@angular/material/table';
import { UpdateModalComponent } from '../update-modal/update-modal.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddTodoDialogComponent } from 'src/app/add-todo-dialog/add-todo-dialog.component';

@Component({
    selector: 'app-todos',
    templateUrl: './todos.component.html',
    styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

   
    todos: Todo[] = [];
    displayedColumns: string[] = ['Status','id', 'title', 'completed', 'createdAt', 'actions'];
    newTodoTitle: string = ''; 
    editingTodo: Todo | null = null;
    userId!: number;

    constructor(
        private todoService: TodoService,
        public dialog: MatDialog,
         private router: Router
    ) { }

    ngOnInit(): void {
        const role =   localStorage.getItem('userRole');
        if (role === 'ROLE_ADMIN') {
            this.adminFetchTodos();
        } else {
            this.fetchTodos();
        }
    }

    fetchTodos(): void {
            this.todoService.getTodosByUserId().subscribe(
                (todos: Todo[]) => this.todos = todos,
                (error: any) => {
                    console.error('Error fetching todos', error);
                }
            );
    }

    adminFetchTodos(): void {
        this.todoService.getAllTodos().subscribe(
            (todos: Todo[]) => this.todos = todos,
            (error: any) => {
                console.error('Error fetching todos', error);
            }
        );
    }



    deleteTodo(id: number): void {
        if (confirm('Are you sure you want to delete this todo?')) {
            this.todoService.deleteTodoById(id).subscribe(
                () => {
                    this.fetchTodos(); 
                },
                (error: any) => {
                    console.error('Error deleting todo', error);
                }
            );
        }
    }

 updateTodo(updateTodo: any): void {
        this.todoService.updateTodoById(updateTodo).subscribe(() => this.fetchTodos());
        console.log(updateTodo);
 }
 openUpdateTodoDialog(todo: Todo): void {
    const dialogRef = this.dialog.open(UpdateModalComponent, {
      width: '300px',
      data: { ...todo }  // Pass the todo data to the dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.todoService.updateTodo(result).subscribe(
          () => this.fetchTodos(),
          (error: any) => console.error('Error updating todo', error)
        );
      }
    });
  }
    openAddTodoDialog(): void {
        const dialogRef = this.dialog.open(AddTodoDialogComponent, {
            width: '300px',
            data: { title: '' }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                const newTodo: Todo = {
                    id: null,  // Backend will handle the ID generation
                    title: result.title,
                    completed: false,
                    createdAt: new Date(),
                    userId: this.userId
                };

                this.todoService.createTodo(newTodo).subscribe(
                    () => this.fetchTodos(),
                    ( error: any) => console.error('Error adding todo', error)
                );
            }
        });
    }


    logout(): void {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
    }

   
}
