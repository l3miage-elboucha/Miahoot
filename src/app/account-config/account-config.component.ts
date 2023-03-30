import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DataService } from '../data.service';
import { MiahootUser } from '../miahootUser';

@Component({
  selector: 'app-account-config',
  templateUrl: './account-config.component.html',
  styleUrls: ['./account-config.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AccountConfigComponent {

  public fg!: FormGroup<{
    name: FormControl<string>,
    photoURL: FormControl<string>,
    photoFile: FormControl<File | undefined>
  }>;

  public user: MiahootUser | undefined;

  constructor(fb: FormBuilder, data: DataService){
    this.fg = fb.nonNullable.group({
      name: [""],
      photoURL: [""],
      photoFile: [undefined as File | undefined]
    })  
  }
}
