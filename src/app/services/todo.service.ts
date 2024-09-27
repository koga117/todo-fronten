import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; 

export interface Todo {
    id?: string;
    name: string;
    completed: boolean;
    description?: string;
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
        return this.http.post<CreateTodoResponse>(this.apiUrl, todo);
    }

    getTodos(): Observable<Todo[]> {
        return this.http.get<Todo[]>(this.apiUrl);
    }

    updateTodo(id: string, todo: Todo): Observable<Todo> {
        return this.http.put<Todo>(`${this.apiUrl}/${id}`, todo);
    }

    deleteTodo(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
