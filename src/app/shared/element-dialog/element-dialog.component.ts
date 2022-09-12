import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ListaProdutos } from 'src/app/views/home/home.component';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-element-dialog',
  templateUrl: './element-dialog.component.html',
  styleUrls: ['./element-dialog.component.scss']
})
export class ElementDialogComponent implements OnInit {
  element!: ListaProdutos;
  isChange!: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: ListaProdutos,
    public dialogRef: MatDialogRef<ElementDialogComponent>,
  ){}
     
  ngOnInit(): void {
    if(this.data.position!= null){
      this.isChange = true;
    }else{
      this.isChange = false;  
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}


