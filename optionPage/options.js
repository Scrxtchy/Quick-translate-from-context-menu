
function clearNotice(ID) {
  browser.notifications.clear(ID);
}

function saveHTO() {
  const valueOM = document.querySelector('input[name="howToOpen"]:checked').value;

  browser.storage.local.set({openMethod: valueOM});
  browser.notifications.create('noticeOM', {
    'type': 'basic',
    'title': '"Quick translate from context menu"',
    'message': 'Setting is changed. Open by new "'+valueOM+'"'
  });
  setTimeout(function(){ clearNotice('noticeOM') }, 4000);
}

function saveLOTTD() {
  const valueLC = document.querySelector('#languageCode').value;

  browser.storage.local.set({languageCode: valueLC});
  browser.notifications.create('noticeLC', {
    'type': 'basic',
    'title': '"Quick translate from context menu"',
    'message': 'Setting is changed. Current language code is "'+valueLC+'"'
  });
  setTimeout(function(){ clearNotice('noticeLC') }, 4000);
}

document.querySelector('#HTO').addEventListener('input', saveHTO);
document.querySelector('#LOTTD').addEventListener('input', saveLOTTD);
