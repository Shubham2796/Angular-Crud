
import { Component, OnInit } from '@angular/core';
import {CrudService} from './service/crud.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Student-Details';

student : any;
studentname : string;
studentnum : string;
studentadd : string;
studentemail : string;
studentstate : string;
studentcity : string;
message:string;

constructor(public crudservice:CrudService){}

ngOnInit() {
  this.crudservice.get_Allstudent().subscribe(data =>{
    
    this.student = data.map(e =>{
      return{
        id: e.payload.doc.id,
        isedit: false,
        name: e.payload.doc.data()['name'],
        num: e.payload.doc.data()['num'],
        add: e.payload.doc.data()['add'],
        email: e.payload.doc.data()['email'],
        state:e.payload.doc.data()['state'],
        city: e.payload.doc.data()['city']
      };
    })
    console.log(this.student);
  });
  
}


CreateRecord()
{
  let Record = {};
  Record['name'] = this.studentname;
  Record['num'] = this.studentnum;
  Record['add'] = this.studentadd;
  Record['email'] = this.studentemail;
  Record['state'] = this.studentstate;
  Record['city'] = this.studentcity;

  this.crudservice.create_Newstudent(Record).then(res => {
    this.studentname = "";
    this.studentnum = undefined;
    this.studentadd = "";
    this.studentemail = "";
    this.studentstate = "";
    this.studentcity = "";
    console.log(res);
    this.message = "Student Details Save Done";
  }).catch(error => {
    console.log(error);
  })


}
EditRecord(Record)
{
  Record.isedit = true;
  Record.edittname = Record.name;
  Record.edittnum = Record.num;
  Record.edittadd = Record.add;
  Record.editemail = Record.email;
  Record.editstate = Record.state;
  Record.editcity = Record.city;
}
Updatarecord(recorddata)
  {
    let record = {};
    record['name'] = recorddata.editname;
    record['tnum'] = recorddata.editnum;
    record['add'] = recorddata.editadd;
    record['email'] = recorddata.editemail;
    record['state'] = recorddata.editstate;
    record['city'] = recorddata.editscity;
    this.crudservice.update_student(recorddata.id, record);
    recorddata.isedit = false;
  }

  Deletestudent(record_id)
  {
    this.crudservice.delete_student(record_id);
  }

}
