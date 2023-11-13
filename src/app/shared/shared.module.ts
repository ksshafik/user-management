import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { MaterialModule } from './modules/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

const commonModules = [
  MaterialModule,
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  FlexLayoutModule,
];
@NgModule({
  declarations: [FooterComponent, HeaderComponent],
  imports: [...commonModules],
  exports: [FooterComponent, HeaderComponent, ...commonModules],
})
export class SharedModule {}
