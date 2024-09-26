import { Routes  } from '@angular/router';
import { TodoListComponent } from './todo-list/todo-list.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'todo-list', component: TodoListComponent, canActivate: [AuthGuard]},
    { path: '', redirectTo: 'login', pathMatch: 'full' },


];