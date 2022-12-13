import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { SegmentsService } from '../../services/segments.service';

@Component({
  selector: 'app-segment',
  templateUrl: './segment.component.html',
  styleUrls: ['./segment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SegmentComponent implements OnInit {
id : string;
segment : any;

  constructor(private segmentService: SegmentsService,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.segment;
 
    this.activatedRoute.params.subscribe((params =>{
      this.id = params.id;
    })  
    );
    
    
    this.getSegment();
  }

  getSegment(){

   this.segmentService.show(this.id).pipe(first()).subscribe(
      res =>{
        this.segment = res;
      },
    )

  }




}
