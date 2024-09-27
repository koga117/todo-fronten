import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; 

export interface Todo {
    id?: string;
    name: string;
    completed: boolean;
    description?: string;
    userId?: string;
}

export interface CreateTodoResponse {
    message: string;
    todoItem: Todo;
}

@Injectable({
    providedIn: 'root'
})
export class TodoService {
    private url = environment.apiUrl
    private apiUrl = `${this.url}api/todos`;

    constructor(private http: HttpClient) {}

    createTodo(todo: Todo): Observable<CreateTodoResponse> {
        const userId = localStorage.getItem('userId');
        return this.http.post<CreateTodoResponse>(this.apiUrl, { ...todo, userId });
    }

    getTodosByUserId(userId: string): Observable<Todo[]> {
        return this.http.get<Todo[]>(`${this.apiUrl}?userId=${userId}`);
    }

    updateTodo(id: string, todo: Todo): Observable<Todo> {
        const userId = localStorage.getItem('userId');
        return this.http.put<Todo>(`${this.apiUrl}/${id}`, { ...todo, userId });
    }

    deleteTodo(id: string): Observable<void> {
        const userId = localStorage.getItem('userId');
        return this.http.delete<void>(`${this.apiUrl}/${id}?userId=${userId}`);
    }
}
