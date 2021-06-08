import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchResultOpportunity } from '../models/search-result-opportunity.interface';
import { User } from '../models/user.interface';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  opportunitiesForm: FormGroup;

  opportunities:SearchResultOpportunity[] = [];
  
  peopleForm: FormGroup;

  people: User[] = [];


  constructor(private formBuilder: FormBuilder, private searchService: SearchService, private router: Router) {
    
   }

  ngOnInit(): void {
    this.opportunitiesForm = this.formBuilder.group({
      search: ['', Validators.required],
      open: false,
      remote: false
    });

    this.peopleForm = this.formBuilder.group({
      name: ['', Validators.required],
    })
  }

  onSubmitOpportunities(formValue) {
    const searchparams = {
      and: this.getSearchValues(formValue)
    };
  this.searchService.searchOpportunity(searchparams).subscribe(
    (data:any) => { console.log(data); this.opportunities = data.results},
    error => console.log(error)
  )
    console.log(searchparams);
  }

  getSearchValues(searchparams:{search: string, open: boolean, remote: boolean} ) {
    let params = [];
    params.push({"skill/role":{"text":searchparams.search,"experience":"potential-to-develop"}})
    if(searchparams.remote) {
      params.push({"skill/role":{"text":"remote","experience":"potential-to-develop"}})
    }
    if(searchparams.open) {
      params.push({"status":{"code":"open"}})
    }
    return params;
  }

  goToJobDetail(id:string) {
    this.router.navigate(['opportunity', id]);
  }

  onSubmitPeople(formValue) {
    const searchParams = {"name": {"term": formValue.name}}
    this.searchService.searchPeople(searchParams).subscribe(
      (data:any) => { console.log(data); this.people = data.results}
    )
  }

}
