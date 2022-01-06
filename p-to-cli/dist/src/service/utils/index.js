export const downloadByAPi = function (req, f = null) {
  console.log(req, 'req')
  return new Promise((resolve, reject) => {
    req.then(({ data, headers }) => {
      let fileName = f;
      if (headers['content-disposition']) {
        fileName = headers['content-disposition'];
        fileName = decodeURIComponent(fileName.split('=')[1]);
      }
      if ('msSaveOrOpenBlob' in navigator) {
        window.navigator.msSaveOrOpenBlob(new Blob([data]), fileName);
      } else {
        let href = window.URL.createObjectURL(new Blob([data]));
        let link = document.createElement('a');
        link.style.display = 'none';
        link.href = href;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        // document.body.removeChild(link);
      }
      resolve();
    });
  });
};

// 直接根据Url下载文件
export function downloadFileByUrl(url, fileName = '附件') {
  const x = new XMLHttpRequest();
  x.open('GET', url, true);
  x.responseType = 'blob';
  // 兼容ie
  if ('ActiveXObject' in window) {
    x.onload = () => {
      window.navigator.msSaveOrOpenBlob(x.response, fileName);
    };
  } else {
    x.onload = () => {
      const href = window.URL.createObjectURL(x.response);
      let link = document.createElement('a');
      link.style.display = 'none';
      link.href = href;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
  }
  x.send();
}
