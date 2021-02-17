import { Component, OnInit } from '@angular/core';
import {ClienteNaturalService} from '@data/services/api/cliente-natural.service';
import {IclienteNatural} from '@data/interfaces/icliente-natural';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
@Component({
  selector: 'app-clientes-list-natural',
  templateUrl: './clientes-list-natural.component.html',
  styleUrls: ['./clientes-list-natural.component.scss']
})
export class ClientesListNaturalComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  // tslint:disable-next-line:variable-name
  public clientes_naturales_list: IclienteNatural[] = [];

  constructor(private clienteNaturalService: ClienteNaturalService) {
    this.clienteNaturalService.getAllClientesNaturales().subscribe(
      r => {
        if (!r.error) {
          this.clientes_naturales_list = r.data;
        }
      }
    );
  }

  ngOnInit(): void {
  }

}
