import { Component } from '@angular/core';
import { LocationService } from '../location.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  form:any ={}
  constructor(
    private LocationService:LocationService,
    private alert:AlertController
  ) {}


  async getLocation() {
    const positition = await this.LocationService.getLocation();
    const { latitude, longitude } = positition.coords;

    // get address
    const getAddress = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
    const address = await getAddress.json();

    return address;
}

ionHandler(ev:any){
  this.form.agama = ev
}


  async sendToWhatssapp(){
    
    if(this.validateForm()){
      this.alert.create({
        message:"isi form dengan benar",
        buttons:['ok']
      }).then(a=>{
        a.present()
      })
      return
    }
    
    this.getLocation()
    console.log(this.getLocation());
    const pesan = `NIK: ${this.form.nik}Nama: ${this.form.nama}Alamat: ${this.form.alamat},agama: ${this.form.agama},RT: ${this.form.rt},RW: ${this.form.rw},KEL: ${this.form.kel},KEC: ${this.form.kec}`
    
    window.open (`https://api.whatsapp.com/send?phone=6281283375214&text=${encodeURIComponent(pesan)}`,'_blank')
  }
  sendToTelegram(){}
  sendToEmail(){
    const recipient = "dimas.satrio206@gmail.com"
    const subject = "Test Email"
    const body = `NIK: ${this.form.nik}Nama: ${this.form.nama}Alamat: ${this.form.alamat},agama: ${this.form.agama},  ${this.form.rt},${this.form.rw}, ${this.form.kel}, ${this.form.kec}`
    const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    window.open(mailtoLink,`NIK: ${this.form.nik}Nama: ${this.form.nama}Alamat: ${this.form.alamat}, ${this.form.rt},${this.form.rw}, ${this.form.kel}, ${this.form.kec}`, "_blank")
  }

  validateForm(){
    if (!this.form.nik|| !this.form.nama|| !this.form.email|| !this.form.alamat || !this.form.rt|| !this.form.rw || !this.form.kelurahan || !this.form.kecamatan|| !this.form.agama ) {
      return false 
    }
    return true
  }
}
