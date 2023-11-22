import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer, PlaceholderContent, PlaceholderName
} from '@microsoft/sp-application-base';
import { SPHttpClientResponse, SPHttpClient } from '@microsoft/sp-http';

import * as strings from 'AlertBarApplicationCustomizerStrings';
import { IAlert } from './IAlert';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Alerts, { IAlertsProps } from './Alerts';
import { Dialog } from '@microsoft/sp-dialog';

const LOG_SOURCE: string = 'AlertBarApplicationCustomizer';

export interface IAlertBarApplicationCustomizerProperties {
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class AlertBarApplicationCustomizer
  extends BaseApplicationCustomizer<IAlertBarApplicationCustomizerProperties> {

  private _topPlaceholder: PlaceholderContent | undefined;

  private _onDispose(): void {
    console.log('[AlertBarApplicationCustomizer._onDispose] Disposed placeholders.');

    if (this._topPlaceholder) {
      // Unmount React component when disposing
      ReactDOM.unmountComponentAtNode(this._topPlaceholder.domElement);
      this._topPlaceholder.dispose();
    }
  }

  private _renderAlertBar(): void {
    this._topPlaceholder = this.context.placeholderProvider.tryCreateContent(
      PlaceholderName.Top,
      { onDispose: this._onDispose }
    );

    // Check if top placeholder is not available or already filled
    if (!this._topPlaceholder) return;
    if (document.getElementsByClassName('alert-bar').length > 0) return;

    this._getAlerts().then((alerts: IAlert[]) => {
      if (!this._topPlaceholder) return;

      const el: React.ReactElement<IAlertsProps> = React.createElement(
        Alerts,
        {
          alerts: alerts,
          renderDialog: this._renderDialog
        }
      );
  
      ReactDOM.render(el, this._topPlaceholder.domElement, () => {
        // Add static class to top placeholder so we can reference it later (to ensure no duplicate)
        this._topPlaceholder?.domElement.classList.add('alert-bar');
      });
    }).catch((e) => {
      console.error('Error getting alerts', e);

      if (!this._topPlaceholder) return;

      throw Error(e);
    });
  }

  private _renderDialog(str: string): void {
    Dialog.alert(str).catch(() => {
      console.error('Error rendering dialog');
    });
  }

  private async _getAlerts(): Promise<IAlert[]> {
    try {
      let url: string = `${this.context.pageContext.web.absoluteUrl}/_api/web/lists/getByTitle('Alerts')/items?`;
      url += `$select=Id,Title,Expires&$filter=Expires ge datetime'${new Date().toISOString()}'`;

      const res: SPHttpClientResponse = await this.context.spHttpClient.get(
        url,
        SPHttpClient.configurations.v1
      );

      const json = await res.json();

      return json.value;
    } catch (e) {
      console.error('Error getting alerts', e);

      return [];
    }
  }

  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    this.context.placeholderProvider.changedEvent.add(this, this._renderAlertBar);

    return Promise.resolve();
  }
}
