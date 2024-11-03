import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { InvestmentResultsComponent } from './investment-results/investment-results.component';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { UserInputModule } from './user-input/user-input.module';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [AppComponent, HeaderComponent, InvestmentResultsComponent],
  imports: [BrowserModule, UserInputModule],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {}
}
