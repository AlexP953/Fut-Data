import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/interfaces/interface';
import { GetPlayersService } from 'src/app/services/get-players.service';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getApp } from 'firebase/app';
import { Router } from '@angular/router';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import { getAuth, updateEmail} from 'firebase/auth';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  player: Player | any;
  futureAvatar: any;
  faArrowLeft = faArrowLeft;

  constructor(
    public getPlayersService: GetPlayersService,
    private authService: AuthService,
    public fbs: AngularFirestore,
    private snackBar: MatSnackBar,
    private router: Router,
    private translate: TranslateService
  ) {}

  faPencil = faPencil;

  storage = getStorage(getApp(), 'gs://my-project-ftbl.appspot.com');
  storageAvatar;
  updatedAvatar;
  loading = false;
  allRight = false;
  whatIdioma;
  auth = getAuth();

  updateUser = new FormGroup({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    birth: new FormControl('', [Validators.required]),
    mail: new FormControl('', [Validators.required, Validators.email]),
    mobile: new FormControl('', [Validators.required, Validators.minLength(9)]),
    language: new FormControl(''),
    frase: new FormControl(''),
    mote: new FormControl(''),
  });

  ngOnInit(): void {
    this.authService.user$.subscribe((data) => {
      this.player = data;
    });
    this.setValue();
    this.storageAvatar = ref(this.storage, `${this.player.id}/avatar.png`);
  }

  async uploadImage(image) {
    await uploadBytes(this.storageAvatar, image).then((snapshot) => {
      console.log('All right');
    });
  }

  downloadImage() {
    getDownloadURL(ref(this.storage, `${this.player.id}/avatar_127x127.png`))
      .then((url) => {
        this.updatedAvatar = url;
      })
      .catch((error) => {
        console.log('error', error);
      });
  }

  deleteAvatar() {
    deleteObject(ref(this.storage, `${this.player.id}/avatar_127x127.png`))
      .then(() => {
        console.log('Bien borrado');
      })
      .catch((error) => {
        console.log('error', error);
      });
  }

  prepareImage(image) {
    const reader = new FileReader();
    reader.readAsDataURL(image.target.files[0]);
    this.futureAvatar = image.target.files[0];
    reader.onload = () => {
      this.player.image = reader.result;
    };
  }

  setValue() {
    this.updateUser.setValue({
      name: this.player.name,
      surname: this.player.surname,
      birth: this.player.birth,
      mail: this.player.mail,
      mobile: this.player.mobile,
      frase: this.player.frase,
      language: this.player.language === 'esp' ? 'esp' : 'cat',
      mote: this.player.mote,
    });
  }

  updatePlayer() {
    this.loading = true;
    this.uploadImage(this.futureAvatar);
    let userUpdate = this.updateUser.value;
    this.downloadImage();
    setTimeout(() => {
      this.changeMail(userUpdate.mail);
      this.fbs
        .collection('players')
        .doc(this.player.id)
        .update({
          name: userUpdate.name,
          surname: userUpdate.surname,
          birth: userUpdate.birth,
          mail: userUpdate.mail,
          mobile: userUpdate.mobile,
          frase: userUpdate.frase,
          language: userUpdate.language,
          mote: userUpdate.mote,
          image: this.updatedAvatar,
        })
        .then(() => {
          this.allRight = true;
          this.snackBar.open('All right!', '', {
            duration: 5000,
          });
          this.router.navigateByUrl('dashboard');
        });
      this.loading = false;
    }, 5000);
  }

  changeMail(newMail) {
     updateEmail(this.auth.currentUser, newMail)
       .then(() => {
         // Email updated!
       })
       .catch((error) => {
         // An error occurred
         console.log('error', error);
       });
  }
}
