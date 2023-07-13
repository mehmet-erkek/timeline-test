import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AppComponent } from './app.component';
import { PanelModule } from 'primeng/panel';
import { ToastModule} from 'primeng/toast'
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DialogModule } from 'primeng/dialog';
import { ConfirmationService, MessageService } from "primeng/api";
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { SidebarModule } from 'primeng/sidebar';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PanelModule,
    BrowserAnimationsModule,
    ConfirmDialogModule,
    ToastModule,
    ConfirmPopupModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    SidebarModule,
    CalendarModule
  ],
  providers: [ConfirmationService,MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
