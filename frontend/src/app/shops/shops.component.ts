import { Component, Inject, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  Configuration,
  Local_config,
  Orders,
  ordersEnum,
  Transmit,
} from '../../shared/models/models';
import { ConfigurationService } from '../../shared/services/configuration.service';
import { LocalConfigService } from '../../shared/services/local_config.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { AppComponent } from '../app.component';
import { TransmitService } from 'src/shared/services/transmit.service';
import { OrdersService } from 'src/shared/services/orders.service';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.scss'],
})
export class ShopsComponent implements OnInit {
  shop_url_iframe: SafeResourceUrl;
  url = '';
  public showIFrame = false;
  public visibleButton = true;
  dialogbool: boolean;
  configuration: Configuration[] = [];
  localConfig: Local_config[] = [];
  orders: Orders[] = [];

  configForm = new FormGroup({
    configuration_id: new FormControl(''),
    supplier_name: new FormControl('', [
      Validators.required,
      Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$'),
    ]),
    shop_url: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'
      ),
    ]),
    shop_user: new FormControl('', Validators.required),
    shop_password: new FormControl('', Validators.required),
    shop_return_address: new FormControl('', Validators.required),
    supply_id: new FormControl('', [
      Validators.required,
      Validators.pattern('/^-?(0|[1-9]d*)?$'),
    ]),
    created_date: new FormControl(''),
    last_modified_date: new FormControl(''),
  });

  getShopUrlErrorMessage() {
    if (this.configForm.value.shop_url.hasError('required') == true) {
      return 'You must enter a value';
    } else {
      return this.configForm.value.name.hasError('configForm')
        ? 'Not a valid URL'
        : '';
    }
  }

  getSupplyIdErrorMessage() {
    if (this.configForm.value.supply_id.hasError('required') == true) {
      return 'You must enter a value';
    } else {
      return this.configForm.value.supply_id.hasError('configForm')
        ? 'Not a valid supplier_ID'
        : '';
    }
  }

  getSupplierNameErrorMessage() {
    if (this.configForm.value.supplier_name.hasError('required') == true) {
      return 'You must enter a value';
    } else {
      return this.configForm.value.supplier_name.hasError('configForm')
        ? 'Not a valid supplier_name'
        : '';
    }
  }

  getArticleNumberErrorMessage() {
    if (this.configForm.value.ext_article_number.hasError('required') == true) {
      return 'You must enter a value';
    } else {
      return this.configForm.value.ext_article_number.hasError('configForm')
        ? 'Not a valid ext_article_number'
        : '';
    }
  }

  constructor(
    private sanitizer: DomSanitizer,
    public configurationService: ConfigurationService,
    public localConfigService: LocalConfigService,
    public matdialog: MatDialog,
    public ordersService: OrdersService
  ) {
    this.shop_url_iframe = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.url
    );
  }

  ngOnInit(): void {
    this.getConfigData();
    this.getOrders();
  }

  openDialog(
    newshopurl: string,
    shopUserName: string,
    shopPassword: string,
    shopReturnAddress: string
  ): void {
    const dialogRef = this.matdialog.open(DialogOverviewComponent, {
      data: { localIsSet: true },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.dialogbool = result;

      if (this.dialogbool) {
        this.shop_url_iframe = this.sanitizer.bypassSecurityTrustResourceUrl(
          newshopurl +
            '?UName=' +
            shopUserName +
            '&Pword=' +
            shopPassword +
            '&Lancode=DE&SAPUser=T&HOOK_URL=' +
            shopReturnAddress
        );
        this.visibleButton = !this.visibleButton;
        this.showIFrame = true;
      }
    });
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

  getLocalConfig(): void {
    this.localConfigService
      .getLocalConfig()
      .subscribe(
        (localconfiguration) => (this.localConfig = localconfiguration)
      );
  }

  getOrders(): void {
    this.ordersService.getOrders().subscribe((orders) => {
      this.orders = orders;
      this.requestToWebshop();
    });
  }

  requestToWebshop(): void {
    for (var i = 0; i < this.orders.length; i++) {
      if (this.orders[i].status === ordersEnum.GENEHMIGT) {
        var updatedOrder = this.orders[i];
        updatedOrder.status = ordersEnum.BESTELLT;
        this.ordersService.transmitToWebshop(updatedOrder).subscribe(() => {
          updatedOrder.status = ordersEnum.BESTELLT;
        });
      }
    }
  }
}

@Component({
  selector: 'app-dialog-overview',
  templateUrl: './dialog-overview.component.html',
})
export class DialogOverviewComponent implements OnInit {
  local_config: Local_config[] = [];
  transmit: Transmit[] = [];

  constructor(
    public localConfigService: LocalConfigService,
    public appComponent: AppComponent,
    public transmitService: TransmitService,
    public dialogRef: MatDialogRef<DialogOverviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.getLocalConfigData();
  }

  local_configForm = new FormGroup({
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

  transmit_Form = new FormGroup({
    local_config_id: new FormControl(''),
    user_id: new FormControl(''),
  });

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
  }

  getLocalConfigData(): void {
    this.localConfigService
      .getLocalConfig()
      .subscribe((local) => (this.local_config = local));
  }

  onSubmit() {
    const userId = this.appComponent.getSessionUserID();
    const localConfigId = this.local_configForm.value['local_config_id'];

    this.transmit_Form.setValue({
      local_config_id: localConfigId,
      user_id: userId,
    });

    this.transmitService
      .transmitUseridAndLocalConfigId(this.transmit_Form.value)
      .subscribe((data) => this.transmit.push(data));
  }

  afterclose() {
    this.dialogRef.close();
  }
}
