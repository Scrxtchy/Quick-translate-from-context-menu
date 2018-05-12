
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
              const createData01 = {
                height: 720, width: 800,
                url: URL01
              };
              browser.windows.create(createData01);
              break;
            case 'tab':
              browser.tabs.create({url: URL01});
              break;
          }
        }
        let languageValue01 = 'en';
        if (object.languageValue) {
          languageValue01 = object.languageValue;
        }
        const URL01 = 'https://translate.google.com/#auto/'+languageValue01+'/'+info.selectionText;
        const getOpenMethod = browser.storage.local.get('openMethod')
          .then(winOrTab01);
      }
      const getLanguageValue01 = browser.storage.local.get('languageValue')
        .then(Language01);
      break;

    case ID02:
      function Language02(object) {
        let languageValue02 = 'en';
        if (object.languageValue) {
          languageValue02 = object.languageValue;
        }
        const URL02 = 'https://translate.google.com/translate?hl='+
                      languageValue02+'&sl=auto&tl='+languageValue02+'&u='+info.pageUrl;
        const createData02 = {url: URL02};
        browser.tabs.create(createData02);
      }
      const getLanguageValue02 = browser.storage.local.get('languageValue')
        .then(Language02);
      break;
  }
});
