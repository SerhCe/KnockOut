import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { Router } from '@angular/router';
import { Local_config } from '../../shared/models/models';
import { LocalConfigService } from '../../shared/services/local_config.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-locale-config',
  templateUrl: './locale-config.component.html',
  styleUrls: ['./locale-config.component.scss'],
})
export class LocaleConfigComponent implements OnInit {
  @ViewChild('matEdit')
  matEdit!: MatSelect;

  @ViewChild('matDelete')
  matDelete!: MatSelect;

  local_config: Local_config[] = [];

  local_configForm = new FormGroup({
    local_config_id: new FormControl(''),

    local_config_name: new FormControl('', [
      Validators.required,
      Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚß ]+$'),
    ]),

    buyer_party_name: new FormControl('', [
      Validators.required,
      Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚß ]+$'),
    ]),

    tel_number_1: new FormControl('', [
      Validators.required,
      Validators.pattern('[- +()0-9]+'),
    ]),

    address_1: new FormControl('', [
      Validators.required,
      Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚß ]+$'),
    ]),

    zipcode_1: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(5),
    ]),

    city_1: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z ]*$'),
    ]),

    country_1: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z ]*$'),
    ]),

    supplier_party_name: new FormControl('', [
      Validators.required,
      Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚß ]+$'),
    ]),

    address_2: new FormControl('', [
      Validators.required,
      Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚß ]+$'),
    ]),

    zipcode_2: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(5),
    ]),

    city_2: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z ]*$'),
    ]),

    country_2: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z ]*$'),
    ]),

    invoice_party_name: new FormControl('', [
      Validators.required,
      Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚß]+$'),
    ]),

    tel_number_3: new FormControl('', [
      Validators.required,
      Validators.pattern('[- +()0-9]+'),
    ]),

    email_address_3: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),

    address_3: new FormControl('', [
      Validators.required,
      Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚß ]+$'),
    ]),

    zipcode_3: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(5),
    ]),

    city_3: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z ]*$'),
    ]),

    country_3: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z ]*$'),
    ]),
  });

  local_delete_configForm = new FormGroup({
    local_config_id: new FormControl(''),

    local_config_name: new FormControl('', Validators.required),

    buyer_party_name: new FormControl('', Validators.required),

    tel_number_1: new FormControl('', Validators.required),

    address_1: new FormControl('', Validators.required),

    zipcode_1: new FormControl('', Validators.required),

    city_1: new FormControl('', Validators.required),

    country_1: new FormControl('', Validators.required),

    supplier_party_name: new FormControl('', Validators.required),

    address_2: new FormControl('', Validators.required),

    zipcode_2: new FormControl('', Validators.required),

    city_2: new FormControl('', Validators.required),

    country_2: new FormControl('', Validators.required),

    invoice_party_name: new FormControl('', Validators.required),

    tel_number_3: new FormControl('', Validators.required),

    email_address_3: new FormControl('', Validators.required),

    address_3: new FormControl('', Validators.required),

    zipcode_3: new FormControl('', Validators.required),

    city_3: new FormControl('', Validators.required),

    country_3: new FormControl('', Validators.required),
  });

  constructor(
    public local_configService: LocalConfigService,
    public router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getLocalConfigData();
  }

  getLocalConfigData(): void {
    this.local_configService
      .getLocalConfig()
      .subscribe((local) => (this.local_config = local));
  }

  addLocalConfigData(newLocalConfig: Local_config) {
    this.local_configService.addLocalConfig(newLocalConfig).subscribe(
      (local) => this.local_config.push(local),
      (error: HttpErrorResponse) =>
        this.openSnackBar('Es ist ein Fehler aufgetreten.'),
      () =>
        this.openSnackBar('Ihre Konfiguration wurde erfolgreich gespeichert.')
    );
  }

  deleteLocalConfigData(local: Local_config) {
    this.local_config = this.local_config.filter((l) => l !== local);
    this.local_configService.deleteLocalConfig(local.local_config_id).subscribe(
      (res) =>
        this.openSnackBar('Ihre Konfiguration wurde erfolgreich gelöscht'),
      (err) => this.openSnackBar('Es ist ein Fehler aufgetreten.')
    );
  }

  updateLocalConfigData(updatedLocalConfig: Local_config) {
    this.local_configService
      .updateLocalConfig(updatedLocalConfig.local_config_id, updatedLocalConfig)
      .subscribe(
        (res) => this.openSnackBar('Ihre Konfiguration wurde erfolgreich geändert!'),
        (err) => this.openSnackBar('Es ist ein Fehler aufgetreten.')
      );
  }

  onSubmit() {
    console.log(this.local_configForm.value);
    this.addLocalConfigData(this.local_configForm.value);
    this.getLocalConfigData();
  }

  onEdit() {
    console.log(this.local_configForm.value);
    this.updateLocalConfigData(this.local_configForm.value);
    this.resetForm();
  }

  onDelete() {
    console.log(this.local_delete_configForm.value);
    this.deleteLocalConfigData(this.local_delete_configForm.value);
    this.getLocalConfigData();
    this.resetForm();
  }

  dropdownValues(localconf: Local_config) {
    this.local_configForm.setValue({
      local_config_id: localconf.local_config_id,
      local_config_name: localconf.local_config_name,
      buyer_party_name: localconf.buyer_party_name,
      tel_number_1: localconf.tel_number_1,
      address_1: localconf.address_1,
      zipcode_1: localconf.zipcode_1,
      city_1: localconf.city_1,
      country_1: localconf.country_1,
      supplier_party_name: localconf.supplier_party_name,
      address_2: localconf.address_2,
      zipcode_2: localconf.zipcode_2,
      city_2: localconf.city_2,
      country_2: localconf.country_2,
      invoice_party_name: localconf.invoice_party_name,
      tel_number_3: localconf.tel_number_3,
      email_address_3: localconf.email_address_3,
      address_3: localconf.address_3,
      zipcode_3: localconf.zipcode_3,
      city_3: localconf.city_3,
      country_3: localconf.country_3,
    });
    this.local_delete_configForm.setValue({
      local_config_id: localconf.local_config_id,
      local_config_name: localconf.local_config_name,
      buyer_party_name: localconf.buyer_party_name,
      tel_number_1: localconf.tel_number_1,
      address_1: localconf.address_1,
      zipcode_1: localconf.zipcode_1,
      city_1: localconf.city_1,
      country_1: localconf.country_1,
      supplier_party_name: localconf.supplier_party_name,
      address_2: localconf.address_2,
      zipcode_2: localconf.zipcode_2,
      city_2: localconf.city_2,
      country_2: localconf.country_2,
      invoice_party_name: localconf.invoice_party_name,
      tel_number_3: localconf.tel_number_3,
      email_address_3: localconf.email_address_3,
      address_3: localconf.address_3,
      zipcode_3: localconf.zipcode_3,
      city_3: localconf.city_3,
      country_3: localconf.country_3,
    });
  }

  resetForm() {
    this.local_configForm.reset();
    this.local_delete_configForm.reset();
    if (this.matEdit != null) {
      this.matEdit.options.forEach((data: MatOption) => data.deselect());
    }
    if (this.matDelete != null) {
      this.matDelete.options.forEach((data: MatOption) => data.deselect());
    }
    this.getLocalConfigData();
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Schließen');
  }
}
