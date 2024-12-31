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
  public activeItem: MenuItem = {} ;
  public isLoggedUser = localStorage.getItem('userData') !== '';
  public user = '';
  public isLogin = false;
  public userInfo:any;

  public menuItemsActive:any = {
    home:true,
    profile:false,
    favourite:false,
    listProducts:false,
  }

  constructor(public router:Router){
    const path = window.location.pathname.split('/')[1];
    if(this.menuItemsActive[path] !== undefined) {
      this.menuItemsActive = {
        home:false,
        profile:false,
        favourite:false,
        listProducts:false,
      };
      this.menuItemsActive[path] = true;
    }
  }

  ngOnInit() {
    if(window.location.pathname === '/login')this.isLogin = true;
    if(this.isLoggedUser ){
      const data = localStorage.getItem('userData');
      this.userInfo = JSON.parse(data !!);
      this.user = this.userInfo.email.split('@')[0];
      this.items = [
          { label: 'Inicio', icon: 'pi pi-fw pi-home', routerLink:'home'},
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

  changeMenu(tab:'home'|'profile'|'favourite'|'listProducts'){
    this.menuItemsActive = {
      home:false,
      profile:false,
      favourite:false,
      listProducts:false,
    };
    this.menuItemsActive[tab] = true;
    this.goTo(tab);
  }

  onActiveItemChange(event: any) {
      this.activeItem = event;
  }
  goTo(route:any){
    this.router.navigate([route]);
  }

  logout(){
    localStorage.setItem('userData', '');
    location.reload();
  }

}
