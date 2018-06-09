
// ID
const ID01 = 'selectText';
const title01 = 'Translate selected text';

const ID02 = 'clickPage';
const title02 = 'Translate this page';

// menu
const menu01 = browser.menus.create({
  id: ID01, title: title01, contexts: ['selection'],
});

const menu02 = browser.menus.create({
  id: ID02, title: title02, contexts: ['page'],
});

// behavior
function openByNewWindow(URL) {
  browser.windows.create({height: 720, width: 800, url: URL});
}

function openByNewTab(URL) {
  browser.tabs.create({url: URL});
}

function noticeNotSet() {
  browser.notifications.create('noticeNS', {
    'type'   : 'basic',
    'title'  : '"Quick translate from context menu".',
    'message': 'Setting is not completed. Please make settings on the add-on\'s details page. '
  });
  setTimeout(function(){ browser.notifications.clear('noticeNS'); }, 6000);
}

browser.menus.onClicked.addListener((info, tab) => {
  function menuBehavior(obj) {
    if ((obj.textOpenMethod == null) || (obj.languageCode == null)) {
      noticeNotSet();
    }
    const objLC = obj.languageCode;

    switch (info.menuItemId) {
      case ID01:
        const URL01 = 'https://translate.google.com/#auto/'+objLC+'/'+info.selectionText
                     .replace(/\%/g, '%25').replace(/\//g, '%2F');
        switch (obj.textOpenMethod) {
          case 'window':
            openByNewWindow(URL01);
            break;
          case 'tab':
            openByNewTab(URL01);
            break;
        }
        break;
      case ID02:
        const URL02 = 'https://translate.google.com/translate?hl='+objLC+'&sl=auto&tl='
                     +objLC+'&u='+info.pageUrl;
        openByNewTab(URL02);
        break;
    }
  }

  const getMenuInfo = browser.storage.local.get(['textOpenMethod', 'languageCode'])
    .then(menuBehavior);
});
