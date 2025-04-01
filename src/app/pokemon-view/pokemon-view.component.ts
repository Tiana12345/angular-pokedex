import { Component } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';
import { type } from '../models/type';

@Component({
  selector: 'app-pokemon-view',
  imports: [],
  templateUrl: './pokemon-view.component.html',
  styleUrl: './pokemon-view.component.css'
})
export class PokemonViewComponent {

  private id: number = 0
  pokemon !: Pokemon;
  // pokemonSpecies !: PokemonSpecies;
  constructor(private readonly activatedRoute: ActivatedRoute,
    private readonly service: PokemonService,
    // private readonly speciesService : pokemonSpeciesService
  ) {

  }



  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.service.getPokemon(this.id).subscribe((data: any) => {
      this.pokemon = data;
      console.log(data)
    });


  }
}
