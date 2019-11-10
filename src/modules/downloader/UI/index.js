/**
 * Author: DrowsyFlesh
 * Create: 2018/11/16
 * Description:
 */
import {UI} from 'Libs/UI';
import $ from 'jquery';

//import _ from 'lodash';

export class DownloaderUI extends UI {
  constructor() {
    super({
      name: 'downloader',
    });
  }

  load = (containers, settings) => {
    if (!settings.on) return Promise.resolve();
    return new Promise(resolve => {
      this.interval('.op-board').then((contaienr) => {
        const newBtn = $('<button type="button" class="el-button el-button--default el-button--small" ><span>全部下载</span></button>');
        $(contaienr).append(newBtn);
        newBtn.click(() => {
          chrome.runtime.sendMessage({command: 'downloadAllFiles', from: 'downloader'});
        });
      });
      resolve();
    });
  };

}
