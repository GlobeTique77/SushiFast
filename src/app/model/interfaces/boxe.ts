import { Ingredient } from "./ingredient";
export interface Boxe {
    id: number,
    nom: string,
    pieces: number,
    composition: Ingredient[],
    saveurs: string[],
    prix: number,
    image: string
}
