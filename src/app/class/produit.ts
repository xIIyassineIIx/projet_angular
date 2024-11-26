import { Specs } from "./specs";

export class Produit {
    constructor(
        public id: string,
        public nom: string,
        public description: string,
        public prix: number,
        public categorie: string,
        public disponibilite: boolean,
        public photoUrl: string,
        public commentaires: string[],
        public specification?: Specs
    ) { }
}
