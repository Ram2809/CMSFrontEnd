import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Address } from 'src/app/model/address';
import { Teacher } from 'src/app/model/teacher';
import { AddressService } from 'src/app/services/address.service';
import { Response } from 'src/app/model/response';
@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css']
})
export class AddAddressComponent implements OnInit {
  public staffId:number=0;
  public districtList:String[]=['Chennai','Coimbatore','Madurai','Krishnagiri','Villupuram','Trichy','Thiruvannamalai','Dharamapuri','Salem','Namakal','Erode','Chengalpet','Thiruvallur','Tindivanam','Velankanni','Thanjur','Ramanathapuram','Thirunelveli']
  public response:Response=new Response();
  public sortedDistrictList:String[]=[];
  constructor(private route:ActivatedRoute,
    private addressService:AddressService,
    private router:Router) { }
  AddAddressForm=new FormGroup({
    addressLine:new FormControl('',Validators.required),
    city:new FormControl(''),
    district:new FormControl('',Validators.required),
    state:new FormControl('Tamil Nadu',Validators.required),
    country:new FormControl('India',Validators.required),
    pinCode:new FormControl('',[Validators.required,Validators.pattern("[0-9]{6}")])
  })
  ngOnInit(): void {
    this.staffId=this.route.snapshot.params['id']
    this.sortedDistrictList=this.districtList.sort();
  }
  addAddress()
  {
    const address:Address=new Address();
    address.addressLine=this.addressLine?.value;
    address.city=this.city?.value;
    address.district=this.district?.value;
    address.state=this.state?.value;
    address.country=this.country?.value;
    address.pinCode=this.pinCode?.value;
    const teacher:Teacher=new Teacher();
    teacher.id=this.staffId;
    address.teacher=teacher;
    this.addressService.addAddress(address).subscribe(data=>{
      this.response=data;
      console.log(data);
      window.alert(this.response.message);
      this.router.navigate(['teacher/addlogin',this.staffId])
    })
  }
  get addressLine()
  {
    return this.AddAddressForm.get('addressLine');
  }
  get city()
  {
    return this.AddAddressForm.get('city');
  }
  get district()
  {
    return this.AddAddressForm.get('district');
  }
  get state()
  {
    return this.AddAddressForm.get('state');
  }
  get country()
  {
    return this.AddAddressForm.get('country');
  }
  get pinCode()
  {
    return this.AddAddressForm.get('pinCode');
  }
}
