import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../appModels/employee.model';
import { DesignUtilityService } from '../appServices/design-utility.service';

@Component({
  selector: 'app-emp',
  templateUrl: './emp.component.html',
  styleUrls: ['./emp.component.scss'],
})
export class EmpComponent implements OnInit {
  item: Employee;
  editMode:any = false;
   pid:any;

    editFormData = new FormGroup({
    name: new FormControl(""),
    designation: new FormControl(""),
    dept: new FormControl(""),
    status: new FormControl("")
 });


  constructor(private activatdRoute:ActivatedRoute,
              private _du:DesignUtilityService,
              private router: Router,
              ) { }

  ngOnInit(): void {
    this.activatdRoute.paramMap.subscribe(param=>{
      this.pid = param.get('id')             // (+) Converts string 'id' to number
      this._du.fetchSingleEmployee(this.pid).subscribe(res=>{
        this.item = res;
        this.editFormData.patchValue(this.item);
      })

      this.activatdRoute.queryParamMap.subscribe(qParam=>{
        this.editMode = qParam.get('editMode');
      })
    })
  }

  onEmpEdit(item, id){
    console.log(item);
     this._du.updateUser(item, id).subscribe(res => {
       this.item = res;
       this.router.navigate(['/dashboard']);
     })
  }

}
