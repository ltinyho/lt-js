import numeral from 'numeral'

function _transferStrAnswerTOArray(answerString, isFormat) {
  let answerArray = answerString.split(';')
  answerArray     = answerArray.map(item => _transferAnswerItem(item, isFormat))
  return answerArray
}

function _transferAnswerItem(answerItemsString, isFormat) {
  let itemArray = answerItemsString.split(',')
  let answer    = []
  answer[0]     = itemArray[1]
  if (isFormat) {
    itemArray[2] = moneyFormat(itemArray[2])
  }
  if (itemArray[0] === '借') {
    answer[1] = itemArray[2]
    answer[2] = ''
  } else {
    answer[1] = ''
    answer[2] = itemArray[2]
  }
  return answer
}

/**
 * 将凭证练习答案分割
 * @param {Array} quests
 * @param {Boolean} isFormat 是否格式化答案 10000.1 => 10,000.10
 * @returns {*}
 */
function transferQuestsArray(quests, isFormat = false) {
  /**
   * 将答案
   * @param answerString
   * @returns {*|Array}
   * @private
   */
  quests.map((quest, index) => {
    quest.question_answer = _transferStrAnswerTOArray(quest.question_answer, isFormat)
    quest.question_total  = calTotal(quest.question_answer, isFormat)
    return quest
  })
  return quests
}

/**
 *
 * @param {Array}data
 * @param {Boolean} isFormat
 * @returns {[number,number]}
 */

function calTotal(data, isFormat = false) {
  let total = [0, 0]
  for (let i = 0; i < data.length; i++) {
    if (isFormat) {
      total[0] += moneyUnFormat(data[i][1])
      total[1] += moneyUnFormat(data[i][2])
    } else {
      total[0] += +data[i][1]
      total[1] += +data[i][2]
    }
  }
  moneyFormat(total[0])
  return isFormat ? total.map(value => moneyFormat(value)) : total
}

/**
 * 校验凭证内容答案
 * @param user
 * @param answer
 * @returns {{isCorrect: boolean, errInfos: string|array}}
 */
function checkAnswer(user, answer) {
  let result = {
    isCorrect: false,
    errInfos: null
  }
  if (!isArrayLenEqual(user, answer)) {
    result.isCorrect = false
    result.errInfos  = 'itemError'
  } else {
    let errInfos     = user.map((usrSingleAns, trIdx, array) => {

      let errInfo = {
        trIdx: trIdx,
        isCorrect: true,
        isUniqe: true,// 借贷只能填一个
        errArray: [] // 错误的表格index
      }

      if (usrSingleAns[1] && usrSingleAns[2]) {
        errInfo.isUniqe = false
      }

      let usrInAnsIdx = _getUsrSglInAnswerIndex(usrSingleAns, answer)
      if (usrInAnsIdx !== -1) {
        usrSingleAns.forEach((td, tdIdx) => {
          let result = td == answer[usrInAnsIdx][tdIdx]
          !result && errInfo.errArray.push(tdIdx)
        })
      } else {
        errInfo.errArray = [0, 1, 2]
      }
      if (!errInfo.isUniqe || errInfo.errArray.length) {
        errInfo.isCorrect = false
      }
      return errInfo
    })
    result.isCorrect = !errInfos.filter(item => item.isCorrect != true).length
    result.errInfos  = errInfos
  }
  return result
}

/**
 * 根据科目找到在答案中的下标
 * @param usrSglAns
 * @param answer
 * @returns {number}
 * @private
 */
function _getUsrSglInAnswerIndex(usrSglAns, answer) {
  const notInAns  = -1
  let usrInAnsIdx
  let isInsAnswer = answer.some((item, idx) => {
    let res = usrSglAns[0] === item[0]
    res && (usrInAnsIdx = idx)
    return res
  })
  if (!isInsAnswer) return notInAns

  return usrInAnsIdx
}

/**
 * 校验总数
 * @param user
 * @param answer
 * @returns {{isCorrect: boolean, totalRes: [boolean,boolean]}}
 */
function checkTotal(user, answer) {
  let totalRes = [true, true]
  if (user[0] != answer[0]) totalRes[0] = false
  if (user[1] != answer[1]) totalRes[1] = false
  return {
    isCorrect: !totalRes.filter(item => item != true).length,
    totalRes: totalRes
  }
}

function isArrayLenEqual(arr1, arr2) {
  return arr1.length === arr2.length
}

function moneyFormat(number) {
  return numeral(number).format('0,0[.]00')
}

function moneyUnFormat(number) {
  return numeral(number).value()
}

/**
 * 展开分类，用于搜索
 * @param sort
 * @returns {Array}
 */
const flattenSort = function (sort) {
  let flatSort = []

  function flattenSort(sort) {
    sort.forEach((val, index) => {
      if (val.child) {
        flattenSort(val.child)
      } else {
        flatSort.push(val)
      }
    })
  }

  flattenSort(sort)
  return flatSort
}

const voJs = {
  transferQuestsArray: transferQuestsArray,
  calTotal: calTotal,
  moneyFormat: moneyFormat,
  moneyUnFormat: moneyUnFormat,
  flattenSort: flattenSort,
  checkAnswer: checkAnswer,
  checkTotal: checkTotal
}

export default voJs