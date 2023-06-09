//-------------------MODULES(START)----------------------
import { APP_INITIALIZER, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient, HttpBackend, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CompanyModule } from './company/company.module';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from './shared/shared.module';
import { QRCodeModule } from 'angularx-qrcode';
//-------------------MODULES(END)----------------------

//-------------------COMPONENTS(START)----------------------
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ServiceWorkerModule } from '@angular/service-worker';
import { PwaService } from './shared/services/pwa.service';



//-------------------COMPONENTS(END)----------------------

export function createTranslateLoader(http: HttpBackend) {
  return new TranslateHttpLoader(new HttpClient(http), './assets/i18n/', '.json');
}

const initializer = (pwaService:PwaService)=>()=>{
  pwaService.initPwaPrompt()
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent
  ],

  imports: [
    BrowserModule,
    SharedModule,
    AdminModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatDividerModule,
    MatFormFieldModule,
    MatGridListModule,
    MatNativeDateModule,
    MatToolbarModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    UserModule,
    MatButtonModule,
    MatProgressBarModule,
    CompanyModule,
    BrowserAnimationsModule,
    QRCodeModule,
    TranslateModule.forRoot({
      defaultLanguage: 'de',
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpBackend],
      }
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  { provide: APP_INITIALIZER,useFactory:initializer, deps:[PwaService], multi:true}
],
  bootstrap: [AppComponent]
})
export class AppModule { }
