import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAccordion } from '@angular/material/expansion';
import { Category } from 'src/app/components/category/category.component';
import { Destination } from 'src/app/models/destinations.model';
import { DestinationService } from 'src/app/services/destinations.service';
import { environment } from 'src/environments/environment';
import { MatSelectModule } from '@angular/material/select';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-destination',
  templateUrl: './admin-destination.component.html',
  styleUrls: ['./admin-destination.component.css']
})
export class AdminDestinationComponent implements OnInit {
  DestinationService: any;
  UserService: any;
  imageUrl: string = '';

  constructor(
    private destService: DestinationService,
    private http: HttpClient
  ) { }
  selectedFile: File | undefined;

  onFileSelected(event: any) {

    const file: File = event.target.files[0];
    this.selectedFile = file;

    const reader = new FileReader();
    reader.onload = (e: any) => {
    this.imageUrl = e.target.result;
  };
  reader.readAsDataURL(file);
  }

  ngOnInit(): void {
    this.loadData();

  }

  panelOpenState = false;

  @ViewChild('myaccordion')
  myPanels!: MatAccordion;

  loadData() {
    this.destService.getAll().subscribe(data => {
      if ("statusCode" in data) {
        this.destinations = [];
      } else {
        for (let dest of data) {
          dest.imageURL = environment.API_URL + "/" + dest.imageURL;
        }
        this.destinations = data;
      }
    })

  }
  

  destinations: Destination[] = [];

  activeTab: String = "users"

  panels: string[] = ["destinations", "users", "bookings"]

  checkDest(panel: string) {
    if (this.activeTab == panel) {
      return true
    }

    return false;

  }

  openPanel(panel: string) {
    this.activeTab = panel;
  }

  splitCategories(cat: string[]) {

    let categories: string = "";

    for (let i = 0; i < cat.length; i++) {

      categories += "[" + cat[i] + "] "

    }

    return categories;
  }
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

deleteDest(id: string) {
  this.destService.remove(id).subscribe(
    () => {
      this.loadData();
    },
    (error) => {
      console.error('Greška prilikom brisanja destinacije:', error);
    }
  );
}
  hideInput: string = "display: none;"
  showInput: string = "display: block"
  hide: string = "display: none;"
  show: string = "display: block"

  editEvent(option:boolean) {

    if(option){
      this.hideInput = this.show;
      this.showInput = this.hide;
    }else{
      this.hideInput = this.hide;
      this.showInput = this.show;
    }

  }

  reloadPage(){
    window.location.reload();
  }

  passVariable(val:string){
    return val
  }


  editForm = new FormGroup({
    cityEdit: new FormControl("", [Validators.required]),
    countryEdit: new FormControl("", [Validators.required]),
    descriptionEdit: new FormControl("", [Validators.maxLength(50)]),
    reviewEdit: new FormControl("", [Validators.required, Validators.min(0), Validators.max(5)])
  })

  editDest(id:string) {

    let city = this.editForm.value.cityEdit;
    let country = this.editForm.value.countryEdit;
    let description = this.editForm.value.descriptionEdit;
    let review = this.editForm.value.reviewEdit;


    this.destService.update(id, city, country, description, review).subscribe(d => {
      window.location.reload();
    })

    this.hideInput = this.hide;
    this.showInput = this.show;
  }


  destinationForm = new FormGroup(
    {
      city: new FormControl("", [Validators.required]),
      country: new FormControl("", [Validators.required]),
      description: new FormControl(),
      review: new FormControl("", [Validators.required, Validators.min(0), Validators.max(5)]),
      image: new FormControl("/photo/"),
      categories: new FormControl("")

    }
  );

  searchForm = new FormGroup({
    id: new FormControl("", [Validators.required])
  })


  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  Categories: Category[] = [];
  @Output()
  onSubmit = new EventEmitter<Category[]>();


  submit() {
    this.onSubmit.emit(this.Categories);
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.Categories.push({ name: value });
    }
    event.chipInput!.clear();
  }

  remove(categories: Category): void {

    const index = this.Categories.indexOf(categories);

    if (index >= 0) {
      this.Categories.splice(index, 1);
    }
  }

  createDest() {

    let city = this.destinationForm.value.city;
    let country = this.destinationForm.value.country;
    let description = this.destinationForm.value.description;
    let review = this.destinationForm.value.review;
    let categories: string[] = this.Categories.map(category => category.name);

    let image = this.selectedFile; 

    if (image) {
      this.destService.uploadImage(image).subscribe(response => {
          let imagePath = response.imagePath;

          this.destService.create(city, country, description, review, imagePath, categories).subscribe(() => {
              window.location.reload(); 
          });
      });
  } else {
      console.error('Nije odabrana slika za upload.'); 
  }
  }
}