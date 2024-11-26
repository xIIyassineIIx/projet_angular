export class Commentaire {
    constructor(
        public id: string,
        public nom: string,
        public prenom: string,
        public message: string,
        public idproduit: string,
        public dateCreation: Date
    ) { }
}
