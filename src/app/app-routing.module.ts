import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInComponent } from './auth/log-in/log-in.component';
import { OpportunityDetailComponent } from './dashboard/components/opportunity-detail/opportunity-detail.component';
import { SearchComponent } from './dashboard/search/search.component';
import { AuthGuardService } from './shared/services/auth-guard.service';


const routes: Routes = [
  { path: '', component: LogInComponent },
  { path: 'search', component: SearchComponent, canActivate: [AuthGuardService]},
  { path: 'opportunity/:id', component: OpportunityDetailComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
