import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from '../app/components/login/login.component';
import { TodosComponent } from '../app/components/todos/todos.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { UpdateModalComponent } from './components/update-modal/update-modal.component';

import { HeadersInterceptor } from './headers.interceptor';
import { AddTodoDialogComponent } from './add-todo-dialog/add-todo-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

import { MatSelectModule } from '@angular/material/select';
import { AuthGuard } from './auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TodosComponent,
    UpdateModalComponent,
    AddTodoDialogComponent
  ],
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule
  ],
  providers: [AuthGuard,
    {
      provide: HTTP_INTERCEPTORS, useClass: HeadersInterceptor, multi: true
    },
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
