import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { exhaustMap, map, take } from 'rxjs/operators';
import { Employee } from '../appModels/employee.model';
import { config } from '../config';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DesignUtilityService {
  api = config.API_URL;

  constructor(private http: HttpClient,
    private auth: AuthService) {
  }

  saveData(data){
    return this.http.post(this.api+'/empData2.json', data)
  }

  fetchData(){
    return this.http.get<Employee>(`${this.api}/empData2.json`).pipe(
     map(resData => {
       const userArray = [];
       for(const key in resData) {
        if(resData.hasOwnProperty(key)){
          userArray.push({userId: key, ...resData[key]})
        }
       }
       return userArray;
     })
    )
  }

  fetchSingleEmployee(id){
    return this.http.get<Employee>(`${this.api}/empData2/${id}.json`);
  }

  deleteEmployee(userId){
    if(confirm('Do you want to delete this user?')){
      console.log(userId);
      return this.http.delete(`${this.api}/empData2/${userId}.json`)
    }
  }

  updateUser(item, id):Observable<any> {
    return this.http.put(`${this.api}/empData2/${id}.json`, item)
  }

  // empData = [
  //   { id: 1, name: 'Anup', designation: 'Frontend Developer', dept: 'Development', status: 'Active'},
  //   { id: 2, name: 'Shekhar', designation: 'Angular Developer', dept: 'Development', status: 'Active'},
  //   { id: 3, name: 'John', designation: 'Web Designer', dept: 'Design', status: 'Active'},
  //   { id: 4, name: 'Alex', designation: 'Java Developer', dept: 'Development', status: 'Inactive'},
  //   { id: 5, name: 'Donald', designation: 'Hr Manager', dept: 'Hr', status: 'Active'},
  //   { id: 6, name: 'Sam', designation: 'Admin Manager', dept: 'Admin', status: 'Active'}
  // ]

}
