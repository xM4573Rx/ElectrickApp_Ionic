import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'register', pathMatch: 'full' },
  { path: 'register', loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)},
  { path: 'tabs', loadChildren: './settings/tabs/tabs.module#TabsPageModule' },
  { path: 'list', loadChildren: './settings/device/list/list.module#ListPageModule' },
  { path: 'timer', loadChildren: './timer/timer.module#TimerPageModule' },
  { path: 'groups', loadChildren: './groups/groups.module#GroupsPageModule' },
  { path: 'new', loadChildren: './new/new.module#NewPageModule' },
  { path: 'groups-two', loadChildren: './groups-two/groups-two.module#GroupsTwoPageModule' },
  { path: 'name', loadChildren: './settings/device/name/name.module#NamePageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
