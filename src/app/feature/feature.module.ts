import { NgModule } from '@angular/core';
import { FeatureRoutingModule } from './feature-routing.module';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [LoginComponent, HomeComponent, UserComponent],
  imports: [
    FeatureRoutingModule,
    SharedModule,
  ],
})
export class FeatureModule {}
