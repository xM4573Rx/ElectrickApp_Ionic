import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'tabs', pathMatch: 'full' },
  // { path: 'register', loadChildren: () => import('./settings/tabs/tabs.module').then( m => m.RegisterPageModule)},
  { path: 'tabs', loadChildren: () => import('./settings/tabs/tabs.module').then( m => m.TabsPageModule)},
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'timer', loadChildren: './timer/timer.module#TimerPageModule' },
  { path: 'control', loadChildren: './control/control.module#ControlPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  // { path: 'tabs', loadChildren: './settings/tabs/tabs.module#TabsPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
