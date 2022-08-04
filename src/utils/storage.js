/*
  说明： 分装本地存储操作
*/

// 1. 存储数据
const setItem = (key, value) => {
  // 将数据中类型为数组/对象的数据尝试进行JSON格式字符串的转化
  // key: 数据名称
  // value: 需要缓存的值
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }

  // 将修改后的value存到localstorage中
  window.localStorage.setItem(key, value)
}

// 2. 获取数据
const getItem = key => {
  // 获取本地数据
  const data = window.localStorage.getItem(key)

  // 尝试进行JSON.parse的转化
  try {
    return JSON.parse(data)
  } catch (error) {
    return data
  }
}

// 3. 删除本地存储数据
const removeItem = key => {
  window.localStorage.removeItem(key)
}

// 导出以上所有方法
export {
  setItem,
  getItem,
  removeItem
}
