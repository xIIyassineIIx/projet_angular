import { Routes } from '@angular/router';
import { AccueilComponent } from './component/accueil/accueil.component';
import { ErrorComponent } from './component/error/error.component';
import { ListProduitComponent } from './component/list-produit/list-produit.component';
import { LoginComponent } from './component/login/login.component';
import { AdminComponent } from './list-admin/admin/admin.component';
import { ClientComponent } from './component/clientlist/client/client.component';
import { ProduitComponent } from './component/produit/produit.component';
import { ProduitlistComponent } from './list-admin/produitlist/produitlist.component';
import { CommentaireComponent } from './list-admin/commentaire/commentaire.component';
import { ComptesComponent } from './list-admin/comptes/comptes.component';
import { authloginclientGuard } from './authloginclient.guard';
import { authloginadminGuard } from './authloginadmin.guard';
import { DetailsComponent } from './component/clientlist/details/details.component';
import { PannierComponent } from './component/clientlist/pannier/pannier.component';
import { PannierADMINComponent } from './list-admin/pannier-admin/pannier-admin.component';


export const routes: Routes = [
    { path: 'accueil', title: 'accueil', component: AccueilComponent },
    { path: 'lesproduits', title: 'lesproduit', component: ListProduitComponent },
    { path: 'login', title: 'login', component: LoginComponent },
    { path: 'admin', title: 'admin', component: AdminComponent ,canActivate:[authloginadminGuard],children:[
        { path: 'produit', title: 'produit', component: ProduitlistComponent },
        { path: 'commentaire', title: 'commentaire', component: CommentaireComponent },
        { path: 'comptes', title: 'comptes', component: ComptesComponent },
        { path: 'commandes', title: 'commandes', component: PannierADMINComponent }
    ]},
    { path: 'client', title: 'client', component: ClientComponent ,canActivate:[authloginclientGuard],children:[
        { path: 'details', title: 'details', component: DetailsComponent },
        { path: 'pannier', title: 'pannier', component: PannierComponent }
    ]},
    { path: 'lesproduits/:categorie', component: ListProduitComponent },
    { path: 'produit/:id', component: ProduitComponent },
    { path: '', redirectTo: "accueil", pathMatch: 'full' },
    { path: '**', title: 'Error', component: ErrorComponent }
];
