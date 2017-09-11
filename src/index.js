export default new class ltJs {
  /**
   * 获取浏览器信息
   * @param {string} type
   * @returns {boolean}
   */
  browserInfo(type) {
    var userAgent = navigator.userAgent.toLowerCase()
    switch (type) {
      case 'android':
        return userAgent.indexOf('android') !== -1
      case 'iphone':
        return userAgent.indexOf('iphone') !== -1
      case 'ipad':
        return userAgent.indexOf('ipad') !== -1
      case 'wexin':
        return userAgent.indexOf('micromessenger') !== -1
      default:
        return userAgent
    }
  }

  /**
   * 获取设备信息
   * @param {string} type
   * @returns {boolean}
   */
  deviceInfo(type) {
    var u = navigator.userAgent
    switch (type) {
      case 'android': {
        return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
      }
      case 'ios': {
        return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
      }
    }
  }

  /**
   * 设置页面标题
   * @param {string} title
   */
  setPageTitle(title) {
    var u         = navigator.userAgent
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1
    var isiOS     = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
    if (isAndroid) {
      document.title = title
    } else if (isiOS) {
      var $body      = $('body')
      document.title = title
      var $iframe    = $('<iframe src="/favicon.ico"></iframe>')
      $iframe.on('load', function () {
        window.setTimeout(function () {
          $iframe.off('load').remove()
        }, 0)
      }).appendTo($body)
    }
  }
}