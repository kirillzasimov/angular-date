import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Items } from '@clr/angular/data/datagrid/providers/items';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'autolomous-date';

  dateForm: FormGroup;
  errorOccured = false;
  loading = false;
  loaded = false;

  constructor(private fb: FormBuilder, private afs: AngularFirestore){}

  ngOnInit(){
    this.dateForm = this.fb.group({
      date: ['', [
        Validators.required,
        Validators.minLength(14),
        Validators.maxLength(15)
      ]]
    })
  }

  async submit(){
    this.loading = true;
    const timeStamp = new Date();
    const data = {...this.dateForm.value, timeStamp};
    try{
      await this.afs.collection('dates').add(data);
    }catch(err){
      this.errorOccured = true;
    }
    this.loading = false;
    this.loaded = true;
  }
  
  modalOkClicked(){
    this.loaded = false
  }

  get date(){
    return this.dateForm.get('date');
  }
}
