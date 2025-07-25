import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProposalComponent } from './proposal/proposal.component';
import { MastersComponent } from './admin-panel/masters/masters.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PasswordManagerComponent } from './admin-panel/password-manager/password-manager.component';
import { PasswordChangeComponent } from './login/password-change/password-change.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { NotificationsHistoryComponent } from './notifications-history/notifications-history.component';
import { NonActionableNotificationsComponent } from './non-actionable-notifications/non-actionable-notifications.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: "login", component: LoginComponent },
  { path: 'proposal', component: ProposalComponent },
  { path: 'masters', component: MastersComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'password-manager', component: PasswordManagerComponent },
  { path: "reset-password", component: PasswordChangeComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'notificationhistory', component: NotificationsHistoryComponent },
  { path: 'nonActionableNotifications', component: NonActionableNotificationsComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
