import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-opportunity-detail',
  templateUrl: './opportunity-detail.component.html',
  styleUrls: ['./opportunity-detail.component.scss']
})
export class OpportunityDetailComponent implements OnInit {

  jobId: string;

  jobInfo;

  constructor(private route: ActivatedRoute, private searchService: SearchService, private router: Router) { 
    this.jobId = route.snapshot.params.id;
  }

  ngOnInit(): void {
    this.getJobInfo();
  }

  getJobInfo() {
    this.searchService.getJobById(this.jobId).subscribe(
      (data: any) => {
        this.jobInfo = data;
        console.log(this.jobInfo)
      }
    )
  }

  returnToSearch() {
    this.router.navigate(['search']);
  }

}
