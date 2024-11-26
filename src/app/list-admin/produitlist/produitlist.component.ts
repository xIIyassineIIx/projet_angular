import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Produit } from '../../class/produit';
import { ProduitService } from '../../service/produit.service';
import { ConvertirePipe } from '../../pipe/convertire.pipe';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-produitlist',
  standalone: true,
  imports: [ConvertirePipe,JsonPipe,ReactiveFormsModule],
  templateUrl: './produitlist.component.html',
  styleUrl: './produitlist.component.css'
})
export class ProduitlistComponent {
  produit: Produit[] = [];
  cat: any;
  produitservice: ProduitService = inject(ProduitService);
  ngOnInit(): void {
    this.produitservice.getproduit().subscribe(data => this.produit = data);
  }
  nouveauproduit: FormGroup = new FormGroup({
    id: new FormControl(1, Validators.required),
    nom: new FormControl('PC Gamer X300', Validators.required),
    description: new FormControl('Un PC de bureau puissant conçu pour le gaming et les applications graphiques.', Validators.required),
    prix: new FormControl(1500, [Validators.required, Validators.min(1)]),
    categorie: new FormControl('Gaming', Validators.required),
    disponibilite: new FormControl(true),
    photoUrl: new FormControl('download.jpg', [Validators.required, Validators.pattern("(.)+(jpg|png)$")]),
    specification: new FormGroup({
      processeur: new FormControl('Intel Core i9', Validators.required),
      ram: new FormControl('32GB DDR4', Validators.required),
      stockage: new FormControl('1TB SSD', Validators.required),
      carteGraphique: new FormControl('NVIDIA RTX 3080', Validators.required),
      systemeExploitation: new FormControl('Windows 11', Validators.required)
    })
  });
  public get produitid() {
    return this.nouveauproduit.get("id")
  }
  public get produitnom() {
    return this.nouveauproduit.get("nom")
  }
  public get produitdis() {
    return this.nouveauproduit.get("description")
  }
  public get produitphoto() {
    return this.nouveauproduit.get("photoUrl")
  }
  public get produitprix() {
    return this.nouveauproduit.get("prix")
  }
  public get produitcategorie() {
    return this.nouveauproduit.get("categorie")
  }
  prixvalid() {
    return this.produitprix?.errors?.["min"];
  }
  selectvalid() {
    return this.produitcategorie?.value == "null"
  }
  delet(id: string) {
    this.produitservice.deleteproduit(id).subscribe()
    this.produit = this.produit.filter(x => x.id != id)
  }
  p!: Produit;
  update(id: string) {
    this.p = this.produit.find(x => x.id == id) as Produit;
    this.nouveauproduit = new FormGroup({
      id: new FormControl(this.p.id, Validators.required),
      nom: new FormControl(this.p.nom, Validators.required),
      description: new FormControl(this.p.description, Validators.required),
      prix: new FormControl(this.p.prix, [Validators.required, Validators.min(0)]),
      categorie: new FormControl(this.p.categorie, Validators.required),
      disponibilite: new FormControl(this.p.disponibilite),
      photoUrl: new FormControl(this.p.photoUrl, [Validators.required, Validators.pattern("(.)+(jpg|png)$")]),
      specification: new FormGroup({
        processeur: new FormControl(this.p.specification?.processeur, Validators.required),
        ram: new FormControl(this.p.specification?.ram, Validators.required),
        stockage: new FormControl(this.p.specification?.stockage, Validators.required),
        carteGraphique: new FormControl(this.p.specification?.carteGraphique, Validators.required),
        systemeExploitation: new FormControl(this.p.specification?.systemeExploitation, Validators.required)
      })
    });
  }
  updat: boolean = false;
  onsubmit() {
    if (this.produit.some(x => x.id == this.produitid?.value)) {
      this.produitservice.putproduit(this.nouveauproduit.value).subscribe()
      this.updat = true;
      this.produit[this.produit.findIndex(x => x.id == this.produitid?.value)] = this.nouveauproduit.value;
      setInterval(() => {
        this.updat = false;
      }, 3000);


    }
    else {
      this.produitservice.postproduit(this.nouveauproduit.value).subscribe()
      this.produit.push(this.nouveauproduit.value);
    }
  }
  oncahge(ev: Event) {
    this.cat = (ev.target as HTMLSelectElement).value;

  }
}
