import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableComponent } from './index/components/table/table.component';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { IndexComponent } from './index/index.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PlanningComponent } from './index/components/planning/planning.component';
import { SiteComponent } from './index/components/site/site.component';
import { AnalysisComponent } from './index/components/analysis/analysis.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    IndexComponent,
    PlanningComponent,
    SiteComponent,
    AnalysisComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatInputModule,
    FlexLayoutModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
