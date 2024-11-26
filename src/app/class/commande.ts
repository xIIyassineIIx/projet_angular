export class Commande {
    constructor(
        public id:string,
        public idproduit:string,
        public idclient:string,
        public quantite:number,
        public date:string,
        public statut:string,
        public total:number
        ){}
}
