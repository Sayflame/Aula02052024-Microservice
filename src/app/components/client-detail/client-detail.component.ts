import { Cliente } from './../../interfaces/cliente';
import { ClienteService } from './../../services/cliente.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, ReactiveFormsModule, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-client-detail',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './client-detail.component.html',
  styleUrl: './client-detail.component.css'
})
export class ClientDetailComponent {
  cliente?:Cliente;
  clienteForm: FormGroup = new FormGroup({})
  constructor(
    private route: ActivatedRoute,
    private ClienteService:ClienteService,
    private FormBuilder: FormBuilder){
    this.getClientById()
  }

  id?:string;
  getClientById(){
    this.id = this.route.snapshot.paramMap.get('id') ?? '';
    this.ClienteService.getById(this.id).subscribe((clienteResponse) => this.cliente = clienteResponse)

    this.clienteForm = this.FormBuilder.group({
      nome: [this.cliente?.nome],
      telefone: [this.cliente?.telefone],
      id: [this.cliente?.id]
    })
  }

  update():void{
    if(this.clienteForm.valid){
      const clienteNovo:Cliente = {
        nome: this.clienteForm.value.nome,
        telefone: this.clienteForm.value.telefone,
        id: this.clienteForm.value.id
      }
      this.ClienteService.atualizar(clienteNovo).subscribe()
      alert('Cliente cadastrado com sucesso!')
    }

  }



}
