import { Routes } from '@angular/router';



export const routes: Routes = [{
    path: 'pokemon/:id',
    loadComponent: () => import('./pokemon-view/pokemon-view.component').then((mod) => mod.PokemonViewComponent),
    title: "POKEMON"

},
{
    path: '',
    loadComponent: () => import('./components/pokemon-list/pokemon-list.component').then((mod) => mod.PokemonListComponent),
    title: "Accueil"
}];



