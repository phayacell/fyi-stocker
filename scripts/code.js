function getCharset(contentType) {
  const charset = contentType
    .split(';')
    .filter(function(str) {
      return (
        str
          .trim()
          .toLowerCase()
          .indexOf('charset') === 0
      )
    })
    .map(function(str) {
      return str.replace(/['"]/g, '').split('=')[1]
    })[0]

  return charset ? charset : 'utf-8'
}

function fetchTitle(url) {
  const response = UrlFetchApp.fetch(url)

  const headers = response.getHeaders()
  const charset = headers['Content-Type']
    ? getCharset(headers['Content-Type'])
    : 'utf-8'

  const myRegexp = /<title>([\s\S]*?)<\/title>/i
  const match = myRegexp.exec(response.getContentText(charset))
  const title = match[1].replace(/(^\s+)|(\s+$)/g, '')

  return title
}

function doGet(e) {
  const url = e.parameter.url
  const title = fetchTitle(url)

  const data = JSON.stringify({
    status: 200,
    url: url,
    title: title
  })

  return ContentService.createTextOutput(data).setMimeType(
    ContentService.MimeType.JSON
  )
}
