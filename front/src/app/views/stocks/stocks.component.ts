import { Component } from '@angular/core';

import { IStock } from '../../Interfaces/istock';
import { StockService } from '../../Services/stock.service';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-stocks',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './stocks.component.html',
  styleUrl: './stocks.component.css'
})
export class StocksComponent {
  title = 'stocks';
  stocks: IStock[];

  constructor(private stocksServicio: StockService) {}

  ngOnInit() {
    this.cargaTabla();
  }
  cargaTabla() {
    this.stocksServicio.todos().subscribe((listastocks) => {
      this.stocks = listastocks;
      console.log(listastocks);
    });
  }
  alerta() {
    Swal.fire('stocks', 'Mensaje en stocks', 'success');
  }

  eliminar(proveedorId: number) {
    Swal.fire({
      title: 'stocks',
      text: 'Esta seguro que desea eliminar el registro',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.stocksServicio.eliminar(proveedorId).subscribe((datos) => {
          this.cargaTabla();
          Swal.fire({
            title: 'stocks',
            text: 'Se eliminó con éxito el registro',
            icon: 'success',
          });
        });
      } else {
        Swal.fire({
          title: 'stocks',
          text: 'El usuario canceló la acción',
          icon: 'info',
        });
      }
    });
  }

}
