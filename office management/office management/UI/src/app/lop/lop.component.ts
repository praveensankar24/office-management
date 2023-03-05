import { Component, OnInit } from '@angular/core';
import { VdService } from '../vd.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lop',
  templateUrl: './lop.component.html',
  styleUrls: ['./lop.component.css']
})
export class LopComponent implements OnInit {
 value:any;
  totalEarning: any;
  total: any;
  constructor(private vd:VdService,private route:Router) { }
math=Math;
  ngOnInit(): void {
    this.vd.getdetail().subscribe((result:any)=>{
      this.value=result;
      for(let i of this.value){
        this.totalEarning=i.Salary
        console.log(this.totalEarning);
      }
      this.total=this.totalEarning+6262.4+1500+712.8 
      // console.log();
      
      console.log(this.value)
    })
  }
  print(){
    window.print();
  }
  back(){
    this.route.navigate(['details'])
    .then(()=>{
      window.location.reload();
    })
  }

}
