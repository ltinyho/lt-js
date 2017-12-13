class ltJs {
  isMobile(){
   return  /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)
  }
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
  //金额转成中文大写金额
  formatChineseCapital(amount) {
    var original = amount
    if (parseFloat(original) < 0) {
      throw new Error(original + '无效数字')
      return resultStrSpan
    }
    amount = parseFloat(amount)
    if (isNaN(amount)) {
      return
    }// || Math.abs(amount) > 99999999999.99
    amount            = Math.round(amount * 100)
    var isInt         = amount % 100 == 0 ? true : false
    var numArr        = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
    var unitArr       = ['分', '角', '元', '拾', '佰', '仟', '万', '拾', '佰', '仟', '亿', '拾', '佰', '仟']
    var resultStr     = '', num, unitIdx, len, zeroCount = 0
    var resultStrSpan = ''
    if (amount == 0) {
      return '零元整'
    }

    if (amount < 0) {
      // resultStr += '负';
      amount = -amount
    }
    amount = amount.toString()
    len    = amount.length
    for (var i = 0; i < len; i++) {
      num     = parseInt(amount.charAt(i))
      unitIdx = len - 1 - i
      if (num == 0) {
        //元 万 亿 输出单位
        if (unitIdx == 2 || unitIdx == 6 || unitIdx == 11) {
          resultStr += unitArr[unitIdx]
          zeroCount = 0
        } else {
          zeroCount++
        }
      } else {
        if (zeroCount > 0) {
          resultStr += '零'
          zeroCount = 0
        }

        resultStr = resultStr + numArr[num] + unitArr[unitIdx]
      }
    }

    if (isInt) {
      resultStr += '整'
    }
    return resultStr
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
      try {
        document.title = title;
        var i = document.createElement('iframe');
        i.src = 'http://www.kaoyaya.com/white.ico';
        i.style.display = 'none';
        i.onload = function() {
          setTimeout(function(){
            i.remove();
          }, 9)
        }
        document.body.appendChild(i);
      } catch (e) {
        console.log(e)
      }
    }
  }

  /**
   * 时间转换为几天前,分钟前格式
   * @param  dateTimeStamp
   * @returns {string}
   */
  dateDiff(dateTimeStamp) {
    if (typeof dateTimeStamp === 'string') {
      dateTimeStamp = new Date(dateTimeStamp.replace(/-/g, "/")).getTime();
    }
    var minute     = 1000 * 60;
    var hour       = minute * 60;
    var day        = hour * 24;
    var halfamonth = day * 15;
    var month      = day * 30;
    var now        = new Date().getTime();
    var diffValue  = now - dateTimeStamp;
    if (diffValue < 0) {
      return '';
    }
    var monthC = diffValue / month;
    var weekC  = diffValue / (7 * day);
    var dayC   = diffValue / day;
    var hourC  = diffValue / hour;
    var minC   = diffValue / minute;
    var result;
    if (monthC >= 1) {
      result = '' + parseInt(monthC) + '月前';
    }
    else if (weekC >= 1) {
      result = '' + parseInt(weekC) + '周前';
    }
    else if (dayC >= 1) {
      result = '' + parseInt(dayC) + '天前';
    }
    else if (hourC >= 1) {
      result = '' + parseInt(hourC) + '小时前';
    }
    else if (minC >= 1) {
      result = '' + parseInt(minC) + '分钟前';
    } else
      result = '刚刚';
    return result;
  }
}

export default new ltJs()