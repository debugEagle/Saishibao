let getMonths = () => {
  let allMonths = [];
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  let _getFullMonth = (m) => {
    let y = year;
    if (m <= 0) {
      m += 12;
      y -= 1;
    }
    if (m > 12) {
      m -= 12;
      y += 1;
    }
    let _month = m < 10
      ? '0' + m
      : m;
    let _fullMonth = `${y}${_month}`;
    return _fullMonth
  }

  for (let i = 7; i >= -7; i--) {
    allMonths.push(_getFullMonth(month - i))
  }

  return allMonths
}

//返回日期字符串
let getDataStr = (AddDayCount) => {
  let dd = new Date();
  dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
  let y = dd.getFullYear();
  let m = dd.getMonth() + 1; //获取当前月份的日期
  let d = dd.getDate();

  m = m < 10
    ? '0' + m
    : m;
  d = d < 10
    ? '0' + d
    : d;
  return y + "-" + m + "-" + d;
}

export {getMonths, getDataStr}
