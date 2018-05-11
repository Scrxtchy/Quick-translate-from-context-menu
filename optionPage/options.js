
function saveHtO() {
  browser.storage.local.set({
    openMethod: document.querySelector('input[name="howToOpen"]:checked').value
  });
}

function saveLotTD() {
  browser.storage.local.set({
    languageValue: document.querySelector('#Language').value
  });
}

document.querySelector('#HtO').addEventListener('input', saveHtO);
document.querySelector('#LotTD').addEventListener('input', saveLotTD);