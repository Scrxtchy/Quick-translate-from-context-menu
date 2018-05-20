
// ID
const ID01 = 'selectText';
const title01 = 'Translate selected text';

const ID02 = 'clickPage';
const title02 = 'Translate this page';

// menu
browser.menus.create({
  id: ID01, title: title01, contexts: ['selection'],
});

browser.menus.create({
  id: ID02, title: title02, contexts: ['page'],
});

// behavior
browser.menus.onClicked.addListener((info, tab) => {
  switch (info.menuItemId) {
    case ID01:
      function Language01(object) {
        function winOrTab01(object) {
          let openMethod = 'window';
          if (object.openMethod) {
            openMethod = object.openMethod;
          }
          switch (openMethod) {
            case 'window':
              const createData01 = {height: 720, width: 800, url: URL01};
              browser.windows.create(createData01);
              break;
            case 'tab':
              browser.tabs.create({url: URL01});
              break;
          }
        }
        let languageCode01 = 'en';
        if (object.languageCode) {
          languageCode01 = object.languageCode;
        }
        const URL01 = 'https://translate.google.com/#auto/'+languageCode01+'/'+info.selectionText
                      .replace(/\%/g, '%25').replace(/\//g, '%2F');
        const getOpenMethod = browser.storage.local.get('openMethod')
          .then(winOrTab01);
      }
      const getLanguageCode01 = browser.storage.local.get('languageCode')
        .then(Language01);
      break;

    case ID02:
      function Language02(object) {
        let languageCode02 = 'en';
        if (object.languageCode) {
          languageCode02 = object.languageCode;
        }
        const URL02 = 'https://translate.google.com/translate?hl='+
                      languageCode02+'&sl=auto&tl='+languageCode02+'&u='+info.pageUrl;
        const createData02 = {url: URL02};
        browser.tabs.create(createData02);
      }
      const getLanguageCode02 = browser.storage.local.get('languageCode')
        .then(Language02);
      break;
  }
});
