import { Component, OnInit } from '@angular/core';
import { UserReadService } from './user-read.service';
import { RoleHistoryItem, User } from './userModel';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-users-read',
  templateUrl: './users-read.component.html',
  styleUrls: ['./users-read.component.sass']
})
export class UsersReadComponent implements OnInit {

  userArray:User[] = [];
  selectedUser = {} as User;
  selectedUsersHistory:RoleHistoryItem[] =[];

  constructor(private service: UserReadService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(){
    this.service.findAllUsers()
    .subscribe({
      next: (response) => {
        this.userArray = response;
        console.log(response);
      }
    })
  }

  toggleModal(modal: HTMLElement) {
    modal.classList.toggle('is-active');
  }

  createNewUser(userName: string, userMail: string, modal: HTMLElement){
    let userObj = {} as User;
    userObj.name = userName;
    userObj.email = userMail;
    this.service.createUser(userObj)
    .subscribe({
      next: (response) => {
        this.userArray.push(response);
        this.toggleModal(modal);
        alert("User created!");
      },
      error: (erroResp) =>{
        alert("User creation failed");
      }
    })
  }

  editUserEmail(userName: string, newEmail: string, modal: HTMLElement){
    let userObj = {} as User;
    userObj.name = userName;
    userObj.email = newEmail;
    // Verifica se foi selecionado um usuário
    if (!this.selectedUser || !this.selectedUser.id) {
      console.error("No user selected");
      return;
    }

    // Atualiza o email do usuário selecionado
    this.selectedUser.email = newEmail;
    console.log("testeeee", this.selectedUser.email);

    // Chama o serviço para atualizar o email no backend
    this.service.updateUserEmail(this.selectedUser, this.selectedUser.id)
      .subscribe({
        next: (response) => {
          // Aqui você pode lidar com a resposta do backend, se necessário
          console.log("User email updated successfully");
          console.log(response);
          // Fecha o modal após a atualização
          this.toggleModal(modal);
          alert("User email updated!");
        },
        error: (erroResp) => {
          console.error("Error updating user email:", erroResp);
          alert("Failed to update user email");
        }
      });
  }

  viewUser(user: User, modal: HTMLElement){
    this.selectedUser = user;
    this.getRoleHistory();
    console.log(user);
    this.toggleModal(modal);
  }

  getRoleHistory(){
    this.service.findUsersRoleHistory(this.selectedUser.id)
    .subscribe({
      next: (response) => {
        this.selectedUsersHistory = response;
      }
    })
  }

  prettyDate(date:Date):string{
    const locale = 'en-US'
    const formattedDate:any = formatDate(date,"dd-MM-yyyy",locale);
    return formattedDate;
  }

}
