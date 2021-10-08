const fs = require('fs');
const {ipcRenderer, remote} = require('electron')

const {jsonFilePath, contentFilePath} = remote.getGlobal('config')

let contents = ''
let waitCount = 0;
let timer = null;

let {page: currentPage, count} = require(jsonFilePath);

function goPage (page) {
  const input = document.getElementById('goInt');
  input.value = page;
  const next = document.querySelector('input[type="image"]');
  next.click();
}

const start = (page) => {
  waitForExternal = setInterval(() => {
    if (document.querySelector('#content')){
      waitCount = 0;
      clearInterval(waitForExternal);

      if (page > 1)  {
        console.log(1111);
        goPage(page);
        start();
        return;
      }

      const content = document.querySelector('#content').innerText;
      if (count > 0) {
        contents = contents + content;
        try {
          goPage(currentPage + 1);
          start()
        } catch (e) {
          // 出错，重新加载
          const before = fs.readFileSync(contentFilePath);

          fs.writeFileSync(contentFilePath, before + contents);

          fs.writeFileSync(jsonFilePath, JSON.stringify({
            page: currentPage,
            count,
          }))
          location.reload();
        }
        count = count - 1;
        currentPage ++;
      } else {
        const before = fs.readFileSync(contentFilePath);
        ipcRenderer.sendToHost('success')
        fs.writeFileSync(contentFilePath, before + contents)
      }
    }else{
      waitCount ++;
      if (waitCount >= 50) {
        ipcRenderer.sendToHost('reload')
      }
    }
  }, 1000);
}



start(currentPage)
