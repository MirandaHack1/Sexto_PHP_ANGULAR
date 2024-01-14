import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IStock } from '../Interfaces/istock';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private urlBase: string =
  'http://localhost/Sexto_PHP_ANGULAR/Inventario/Controllers/Stock.Controller.php?op=';
constructor(private clientePhp: HttpClient) {}
todos(): Observable<IStock[]> {
  return this.clientePhp.get<IStock[]>(this.urlBase + 'todos');
}
insertar(stock: IStock): Observable<any> {
  var prov = new FormData();
  prov.append('ProductoId', stock.ProductoId.toString());
  prov.append('ProveedorId', stock.ProveedorId.toString());
  prov.append('Cantidad', stock.Cantidad.toString());
  prov.append('Precio_Venta', stock.Precio_Venta.toString());
  return this.clientePhp.post(this.urlBase + 'insertar', prov);
}
eliminar(id: number): Observable<any> {
  var prov = new FormData();
  prov.append('StockId', id.toString());
  return this.clientePhp.post(this.urlBase + 'eliminar', prov);
}
uno(id: number): Observable<IStock> {
  var prov = new FormData();
  prov.append('StockId', id.toString());
  return this.clientePhp.post<IStock>(this.urlBase + 'uno', prov);
}
actualizar(stock: IStock, id: number): Observable<any> {
  var prov = new FormData();
  prov.append('StockId', id.toString());
  prov.append('ProductoId', stock.ProductoId.toString());
  prov.append('ProveedorId', stock.ProveedorId.toString());
  prov.append('Cantidad', stock.Cantidad.toString());
  prov.append('Precio_Venta', stock.Precio_Venta.toString());
  return this.clientePhp.post(this.urlBase + 'actualizar', prov);
}
 
}
