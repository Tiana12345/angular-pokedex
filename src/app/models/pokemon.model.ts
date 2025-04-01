import { type } from "./type";

export interface Pokemon {
[x: string]: any;
  id : number;
  name : string;
  height: number;
  weight: number;
  sprites: {
     back_default: string;
     back_female: string;
     back_shiny: string;
     back_shiny_female: string;
     front_default: string;
     front_female: string;
     front_shiny: string;
     front_shiny_female: string;
  }
  types: {
   type : type
  }[];
  
 }
  
 interface Attaque {
     name:string;
     power: number;
     accuracy: number;
     pp: number;
    
 }
