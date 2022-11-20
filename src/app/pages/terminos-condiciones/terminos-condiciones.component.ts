import { Component, OnInit } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-terminos-condiciones',
  templateUrl: './terminos-condiciones.component.html',
  styleUrls: ['./terminos-condiciones.component.scss'],
})
export class TerminosCondicionesComponent implements OnInit {
  faArrowLeft = faArrowLeft;

  constructor() {}

  ngOnInit(): void {}
}
