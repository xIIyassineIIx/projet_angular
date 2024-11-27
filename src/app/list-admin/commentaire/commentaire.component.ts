import { Component, OnInit, inject } from '@angular/core';
import { Commentaire } from '../../class/commentaire';
import { CommentaireService } from '../../service/commentaire.service';

@Component({
  selector: 'app-commentaire',
  standalone: true,
  imports: [],
  templateUrl: './commentaire.component.html',
  styleUrl: './commentaire.component.css'
})
export class CommentaireComponent implements OnInit {
alert(id:string) {
  let elem=document.getElementById("alert") as HTMLBaseElement;
  elem.style.display="block"
  this.identifiant=id;
}
confirmer() {
this.deletcomm(this.identifiant)
let elem=document.getElementById("alert") as HTMLBaseElement;
elem.style.display="none"
}
annuler() {
  let elem=document.getElementById("alert") as HTMLBaseElement;
  elem.style.display="none"
}

  identifiant!:string
  commentaire: Commentaire[] = [];
  commentaireservice: CommentaireService = inject(CommentaireService);
  ngOnInit(): void {
    this.commentaireservice.getcommentaire().subscribe(data=>this.commentaire=data)
  }
  deletcomm(id: string) {
    this.commentaireservice.deleteproduit(id).subscribe()
    this.commentaire = this.commentaire.filter(x => x.id != id)
    console.log(typeof (id), typeof (this.commentaire[0].id))
  }
}
