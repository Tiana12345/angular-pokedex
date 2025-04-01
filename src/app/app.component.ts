import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PokemonListComponent } from "./components/pokemon-list/pokemon-list.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HttpClientModule, PokemonListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'angular-pokedex';
}
