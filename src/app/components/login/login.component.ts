import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, User } from '../../services/user.service';
import { TodoService } from 'src/app/services/todo.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
    username: string = '';
    password: string = '';

    constructor(private userService: UserService, private router: Router, private todoService: TodoService) { }
    ngOnInit(): void {
        if (localStorage.getItem('token')) {
             this.router.navigate(['/todos']); //not to navigate on login page if token  is present 
          } 
    }

    onSubmit() {
        this.userService.login(this.username, this.password).subscribe(
            (response: any) => {
                // Store the JWT token in localStorage
                localStorage.setItem('token', response.token);
            localStorage.setItem('userRole', response.roles);
                localStorage.setItem('userId', response.id); // Assuming response.user.id contains the user ID
               

                // Navigate to todos page after login
                this.router.navigate(['/todos']);
            },
            (error: any) => {
                console.error('Error logging in', error);
            }
        );
    }
}