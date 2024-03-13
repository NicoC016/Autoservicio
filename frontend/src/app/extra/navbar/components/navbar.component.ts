import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  
  public items: MenuItem[] = [];
  public activeItem: MenuItem ={} ;
  public isLoggedUser = localStorage.getItem('userData') !== '';
  public user = '';
  public isLogin = false;
  public userInfo:any;

  constructor(
    public router:Router,
  ){}

  ngOnInit() {
    if(window.location.pathname === '/login')this.isLogin = true;
    if(this.isLoggedUser ){
      //@ts-ignore
      this.userInfo = JSON.parse(localStorage.getItem('userData'));
      //@ts-ignore
      this.user = JSON.parse(localStorage.getItem('userData')).email;
      this.items = [
          { label: 'Inicio', icon: 'pi pi-fw pi-home', routerLink:'/'},
          { label: 'Empleados', icon: 'pi pi-fw pi-users', routerLink:'employeed', visible: this.userInfo.role === 'admin'},
          { label: 'Facturar', icon: 'fa-solid fa-file-invoice', routerLink:'bill' },
          { label: 'Clientes', icon: 'pi pi-fw pi-user',routerLink:'client', visible: this.userInfo.role === 'admin' },
          { label: 'Proveedores', icon: 'pi pi-fw pi-truck',routerLink:'suppliers', visible: this.userInfo.role === 'admin' },
          { label: 'Productos', icon: 'fa-solid fa-box',routerLink:'listProducts' },
      ];
      this.activeItem = this.items[0];
    }else{
      this.items = [
        { label: 'Inicio', icon: 'pi pi-fw pi-home', routerLink:'/' },
      ];
      this.activeItem = this.items[0];
    }
  }

  onActiveItemChange(event: MenuItem) {
      this.activeItem = event;
  }
  goTo(route:any){
    this.router.navigate(['login']);
  }

  logout(){
    localStorage.setItem('userData', '');
    location.reload();
  }

}
