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
