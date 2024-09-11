import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Todo {
    id: number | null;  
    title: string;
    completed: boolean;
    createdAt: Date;
    userId: number;
}

@Injectable({
    providedIn: 'root'
})
export class TodoService {
    private apiUrl = 'http://localhost:8080/todo';

    constructor(private http: HttpClient) { }
  
    private getAuthHeaders(): HttpHeaders {
        const token = localStorage.getItem('token');
        return new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
    }
    getAllTodos(): Observable<Todo[]> {
        return this.http.get<Todo[]>(`${this.apiUrl}/admin/showall`, { headers: this.getAuthHeaders() });
      }
    getTodosByUserId(): Observable<Todo[]> {
        return this.http.get<Todo[]>(`${this.apiUrl}/showall`, { headers: this.getAuthHeaders() });
    }
  
    createTodo(todo: Todo): Observable<Todo> {
        return this.http.post<Todo>(`${this.apiUrl}/add`, todo, { headers: this.getAuthHeaders() });
    }

    updateTodoById(todo: Todo): Observable<Todo> {
        return this.http.put<Todo>(`${this.apiUrl}/update/${todo.id}`, todo, { headers: this.getAuthHeaders() });
    }

    updateTodo(todo: Todo): Observable<void> {
        return this.http.put<void>(`${this.apiUrl}/update/${todo.id}`, todo, { headers: this.getAuthHeaders() });
    }
    

    deleteTodoById(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/delete/${id}`, { headers: this.getAuthHeaders() });
    }
}
