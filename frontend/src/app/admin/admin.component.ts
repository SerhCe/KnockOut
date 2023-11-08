import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { Router } from '@angular/router';
import { Configuration } from '../../shared/models/models';
import { ConfigurationService } from '../../shared/services/configuration.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  @ViewChild('matEdit')
  matEdit!: MatSelect;

  @ViewChild('matDelete')
  matDelete!: MatSelect;

  configForm = new FormGroup({
    configuration_id: new FormControl(''),
    shop_url: new FormControl('', Validators.required),
    shop_user: new FormControl('', Validators.required),
    shop_password: new FormControl('', Validators.required),
    shop_return_address: new FormControl('', Validators.required),
    supply_id: new FormControl('', Validators.required),
    supplier_name: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    created_date: new FormControl(''),
    last_modified_date: new FormControl(''),
  });

  configuration: Configuration[] = [];

  constructor(
    public configurationService: ConfigurationService,
    public router: Router,
    private datePipe: DatePipe,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getConfigData();
  }

  getConfigData(): void {
    this.configurationService
      .getConfiguration()
      .subscribe((config) => (this.configuration = config));
  }

  getConfigDataById(id: number): void {
    this.configurationService
      .getConfigurationById(id)
      .subscribe((config) => (this.configuration[id] = config));
  }

  addConfigData(newConfig: Configuration) {
    this.configurationService.addConfiguration(newConfig).subscribe(
      (config) => this.configuration.push(config),
      (error: HttpErrorResponse) =>
        this.openSnackBar('Es ist ein Fehler aufgetreten.'),
      () => this.openSnackBar('Ihr Shop wurde erfolgreich gespeichert.')
    );
  }

  deleteConfig(config: Configuration) {
    this.configuration = this.configuration.filter((c) => c !== config);
    this.configurationService
      .deleteConfiguration(config.configuration_id)
      .subscribe(
        (res) => this.openSnackBar('Ihr Shop wurde erfolgreich gelöscht!'),
        (err) => this.openSnackBar('Es ist ein Fehler aufgetreten.')
      );
  }
  updateConfig(updatedConfig: Configuration) {
    this.configurationService
      .updateConfiguration(updatedConfig.configuration_id, updatedConfig)
      .subscribe(
        (res) => this.openSnackBar('Ihr Shop wurde erfolgreich geändert!'),
        (err) => this.openSnackBar('Es ist ein Fehler aufgetreten.')
      );
  }

  onSubmit() {
    console.log(this.configForm.value);
    this.addConfigData(this.configForm.value);
    this.getConfigData();
  }

  onEdit() {
    console.log(this.configForm.value);
    this.updateConfig(this.configForm.value);
    this.resetForm();
  }

  onDelete() {
    console.log(this.configForm.value);
    this.deleteConfig(this.configForm.value);
    this.getConfigData();
    this.resetForm();
  }

  dropdownValues(test: any) {
    this.configForm.setValue({
      configuration_id: test.configuration_id,
      shop_url: test.shop_url,
      shop_user: test.shop_user,
      shop_password: test.shop_password,
      shop_return_address: test.shop_return_address,
      supply_id: test.supply_id,
      supplier_name: test.supplier_name,
      status: test.status,
      created_date: test.created_date,
      last_modified_date: test.last_modified_date,
    });
    console.log(this.configForm);
  }

  resetForm() {
    this.configForm.reset();
    if (this.matEdit != null) {
      this.matEdit.options.forEach((data: MatOption) => data.deselect());
    }
    if (this.matDelete != null) {
      this.matDelete.options.forEach((data: MatOption) => data.deselect());
    }
    this.getConfigData();
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Schließen');
  }
}
