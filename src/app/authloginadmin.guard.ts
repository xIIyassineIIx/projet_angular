import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authloginadminGuard: CanActivateFn = (route, state) => {
  const router:Router=inject(Router);
  let stateconnexion=localStorage.getItem("connexion")
  let who=localStorage.getItem("statut")
  if(stateconnexion=="connected" && who=="admin"){
    return true
  }else
    router.navigate(["/login"])
    return false;
};
