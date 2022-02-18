import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoxesComponent } from './components/boxes/boxes.component';
import { HistoriqueComponent } from './components/historique/historique.component';
import { RgpdComponent } from './components/rgpd/rgpd.component';

const routes: Routes = [
  { path: '', component: BoxesComponent },
  { path: 'historique', component: HistoriqueComponent },
  { path: 'rgpd', component: RgpdComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
