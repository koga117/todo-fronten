import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let toastrServiceSpy: jasmine.SpyObj<ToastrService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authSpy = jasmine.createSpyObj('AuthService', ['register']);
    const toastrSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        RegisterComponent
      ],
      // declarations: [RegisterComponent],
      providers: [
        { provide: AuthService, useValue: authSpy },
        { provide: ToastrService, useValue: toastrSpy },
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: { snapshot: { params: {} } } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    toastrServiceSpy = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    // Inicializa el objeto user con las propiedades requeridas
    component.user = {
      username: 'testuser',
      password: 'testpassword'
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should call register on the AuthService when onRegister is called', () => {
  //   authServiceSpy.register.and.returnValue(of({})); // Simula respuesta exitosa
  //   component.onRegister();
  //   expect(authServiceSpy.register).toHaveBeenCalledWith(component.user);
  // });

  // it('should navigate to login after successful registration', () => {
  //   authServiceSpy.register.and.returnValue(of({})); // Simula respuesta exitosa
  //   component.onRegister();
  //   expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  // });

  // it('should show success message after successful registration', () => {
  //   authServiceSpy.register.and.returnValue(of({})); // Simula respuesta exitosa
  //   component.onRegister();
  //   expect(toastrServiceSpy.success).toHaveBeenCalledWith('Usuario registrado exitosamente');
  // });

  // it('should show error message when registration fails', () => {
  //   authServiceSpy.register.and.returnValue(throwError({ message: 'Error' })); // Simula error
  //   component.onRegister();
  //   expect(toastrServiceSpy.error).toHaveBeenCalledWith('Error al registrar el usuario', 'Error');
  // });
});
