import { ElementDialogComponent } from './../../shared/element-dialog/element-dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';

export interface ListaProdutos {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: ListaProdutos[] = [
  { position: 1, name: 'Guitarra Les Paul', weight: 4.003, symbol: 'Gibson LP79' },
  { position: 2, name: 'Contrabaixo', weight: 5.304, symbol: 'Ibanez CIS 89' },
  { position: 3, name: 'Violão', weight: 2.332, symbol: 'Yamaha C80' },
  { position: 4, name: 'Guitarra Stratocaster', weight: 3.301, symbol: 'Fender LH MN' },
  { position: 5, name: 'Guitarra Semi Acústica', weight: 10.811, symbol: 'Ibanez ArtCore Af75' },
  { position: 6, name: 'Correia', weight: 0.7002, symbol: 'Correia de couro' },
  { position: 7, name: 'Amplificador', weight: 14.0067, symbol: 'Amplificador Orange crush 20' },
  { position: 8, name: 'Amplificador', weight: 16.9994, symbol: 'Amplificador Fender 231' },
  { position: 9, name: 'Cabo', weight: 0.502, symbol: 'Santo Angelo 3m' },
  { position: 10, name: 'Kit ferramentas luthier', weight: 2.025, symbol: 'Kit com chaves 7 allen' },
];


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild(MatTable)
  table!: MatTable<any>;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'actions'];
  dataSource = ELEMENT_DATA;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  openDialog(element: null | ListaProdutos): void {
    const dialogRef = this.dialog.open(ElementDialogComponent, {
      width: '250px',
      data: element === null ? {
        position: null,
        name: '',
        weight: null,
        symbol: ''
      }:{
        position: element.position,
        name: element.name,
        weight: element.weight,
        symbol: element.symbol
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if (this.dataSource.map(p => p.position).includes(result.position)) {
          this.dataSource[result.position - 1]= result;
          this.table.renderRows();
        } else{
        this.dataSource.push(result)
        this.table.renderRows();
      }}
    });
  }
  deleteElement(position: number): void {
    this.dataSource = this.dataSource.filter(p => p.position !== position);
  }
  editElement(element: ListaProdutos): void {
    this.openDialog(element);
  }
}
