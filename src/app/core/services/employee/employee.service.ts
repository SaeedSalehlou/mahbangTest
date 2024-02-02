import { Injectable } from '@angular/core';
import { EmployeeModel } from '../../../domain/models/employee/employee.model';
import { environment } from '../../../../assets/environment';
import { BaseResponseModel } from '../../../domain/models/base/base-response.model';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, finalize, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private serverUrl = environment.API_URL;
  constructor(private http: HttpClient) { }

  get(): Observable<BaseResponseModel<EmployeeModel[]>> {
    const url = `${this.serverUrl}/employees`;
    return this.http.get<BaseResponseModel<EmployeeModel[]>>(url).pipe(
      map(
        (response: BaseResponseModel<EmployeeModel[]>) => {
          return response;
        }),
      catchError(
        (err) => {
          console.error('FIND ITEMS', err);
          return of(
            {
              status: 'Error',
              message: 'The operation failed',
              data: []
            }
          );
        }),

    );
  }
  getItemById(id: number): Observable<any> {
    const url = `${this.serverUrl}/employee/${id}`;
    return this.http.get<BaseResponseModel<EmployeeModel>>(url).pipe(
      map((response: BaseResponseModel<EmployeeModel>) => {
        return response;
      }),
      catchError((err) => {
        console.error('Fetch ITEM', id, err);
        return of({
          status: 'error',
          message: 'Can\'t Fetch Item',
          data: null
        });
      }),
    );
  }
  create(item: EmployeeModel): Observable<BaseResponseModel<EmployeeModel>> {
    return this.http.post<BaseResponseModel<EmployeeModel>>(`${this.serverUrl}/create`, item).pipe(
      map((response: BaseResponseModel<EmployeeModel>) => {
        return response;
      }),
      catchError((err) => {
        console.error('CREATE ITEM', item);
        return of({
          status: 'error',
          message: 'Can\'t Create Item',
          data: item
        });
      }),
    );
  }
  update(id: number, item: EmployeeModel): Observable<BaseResponseModel<EmployeeModel>> {
    const url = `${this.serverUrl}/update/${id}`;
    return this.http.put<BaseResponseModel<EmployeeModel>>(url, item).pipe(
      map((response: BaseResponseModel<EmployeeModel>) => {
        return response;
      }),
      catchError((err) => {
        console.error('UPDATE ID', id, '/ Item:', item, err);
        return of({
          status: 'error',
          message: 'Can\'t UPDATE Item',
          data: item
        });
      }),
    );
  }
  delete(id: number): Observable<BaseResponseModel<null>> {
    const url = `${this.serverUrl}/delete/${id}`;
    return this.http.delete(url)
      .pipe(
        map((res: any) => {
          return res;
        }),
        catchError((err) => {
          console.error('DELETE ITEM', id, err);
          return of({
            status: 'error',
            message: 'Can\'t Delete Item',
            data: null
          });
        }),
      );
  }
}
