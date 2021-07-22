import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(public fireservices:AngularFirestore) { }

  create_Newstudent(Record)
  {
    return this.fireservices.collection('Student').add(Record);
    
  }
   get_Allstudent()
   {
     return this.fireservices.collection('Student').snapshotChanges();
   }

    update_student(recordid, record)
  {
    this.fireservices.doc('Student/' + recordid).update(record);
  }

  delete_student(record_id)
  {
    this.fireservices.doc('Student/' + record_id).delete();
  }


}
