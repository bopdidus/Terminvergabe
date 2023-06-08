//-------------------MODULES(START)----------------------
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient, HttpBackend } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CompanyModule } from './company/company.module';
import { UserModule } from './user/user.module';
//-------------------MODULES(END)----------------------

//-------------------COMPONENTS(START)----------------------
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


//-------------------COMPONENTS(END)----------------------

export function createTranslateLoader(http: HttpBackend) {
  return new TranslateHttpLoader(new HttpClient(http), './assets/i18n/', '.json');
}



@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatGridListModule,
    MatNativeDateModule,
    MatToolbarModule,
    AppRoutingModule,
    HttpClientModule,
    UserModule,
    MatProgressBarModule,
    CompanyModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      defaultLanguage: 'de',
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpBackend],
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
