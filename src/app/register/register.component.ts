import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService, User } from '../services/auth.service'; // Asegúrate de que el servicio esté importado correctamente
import { ToastrService } from 'ngx-toastr';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: User = { username: '', password: '' };

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  // Método para registrar al usuario
  onRegister() {
    this.authService.register(this.user).subscribe({
      next: (response) => {
        this.toastr.success('Usuario registrado exitosamente');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.toastr.error('Error al registrar el usuario', error.message);
      }
    });
  }
}
