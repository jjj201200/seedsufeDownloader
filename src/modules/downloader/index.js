/**
 * Author: DrowsyFlesh
 * Create: 2019/11/8
 * Description:
 */

import {Feature} from 'Libs/feature';

export {DownloaderUI} from './UI';

export class Downloader extends Feature {
  constructor() {
    super({
      name: 'downloader',
      kind: 'common',
      settings: {
        on: true,
        title: '一键下载按钮',
        hasUI: true,
      },
    });
    this.currentPageFileMap = [];
  }

  addListener = () => {
    chrome.webRequest.onBeforeSendHeaders.addListener((details) => {
      const {initiator, method, url} = details;
      if (/^chrome-extension:\/\//.test(initiator)) return;
      console.warn(details);
      if (method === 'GET') {
        this.getCookie()
            .then((cookie) => {
              fetch(url, {
                credentials: 'same-origin',
                headers: {
                  'From': 'extension',
                  'X-Token': cookie,
                },
              })
              .then(res => res.json())
              .then(res => {
                this.currentPageFileMap = res.data.items.reduce((array, item) => {
                  if (item.online_url) {
                    const {name, online_url: url} = item;
                    array.push({
                      filename: name,
                      url,
                    });
                  }
                  return array;
                }, []);
                console.warn(this.currentPageFileMap);
              });
            });
      }

    }, {
      urls: [
        '*://*.docassist.applinzi.com/web/doc/getUdocList?*',
      ],
    }, ['requestHeaders', 'extraHeaders']);

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      const {from, command} = message;
      if (from !== 'downloader') return true;
      if (command === 'downloadAllFiles') {
        this.currentPageFileMap.forEach(({filename, url}) => {
          chrome.downloads.download({url, filename});
        });
        sendResponse();
      }
      return true;
    });
  };

  getCookie = (url = 'http://docs.seedsufe.com', name = 'seed_token') => {
    return new Promise(resolve => {
      chrome.cookies.get({url, name}, (cookie) => {
        resolve(cookie.value);
      });
    });
  };

  launch = () => {
  };
}
