import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import { User } from '../shared/models/user';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnChanges {

  //Texto para buscar
  @Input() inputText: any;

  //Boolean para  spinner
  loading: boolean = false;

  //Lista de usuarios
  users: any[] = [];

  //Modal
  showModal: boolean = false;

  //Usuario a emitir
  user!: User;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getData();
  }

  ngOnChanges(): void {
    this.getData();
  }

  getData() {
    this.users = [];
    //Si hay término de busqueda, filtramos
    if (this.inputText != '') {
      this.loading = true;
      this.apiService.getUsersByInput(this.inputText).subscribe((data) => {
        this.users = data.items;
        console.log(this.users);
        this.infoAdicionalUsuarios();
      
      });
    } else {
      // Si por el contrario, no hay termino de búsqueda, nos traemos todo
      this.users = [];
      this.apiService.getUsers().subscribe((data: any[]) => {
        this.users = data;
        this.infoAdicionalUsuarios();
      });
    }
   
  }

  infoAdicionalUsuarios(): void {
    this.users.forEach(user => {
      this.apiService.getUser(user.login).subscribe(userDetails => {
        //Mapeamos las propiedades que necesitamos 
        user.name = userDetails.name
        user.location = userDetails.location;
        user.email = userDetails.email;
        user.followers = userDetails.followers;
        user.following = userDetails.following;
        this.loading = false;
      });
    });
  }

  openModal(user: User) {
    this.loading = true;
    this.apiService.getUser(user.login).subscribe((data) => {
      this.user = user;
    })
    this.showModal = true;
    this.loading = false;

  }

  onCloseModal() {
    // Esta función se ejecutará cuando se cierre el modalñ
    // Resetea la propiedad showModal si quieres permitir abrir el modal nuevamente
    this.showModal = false;
  }
}
