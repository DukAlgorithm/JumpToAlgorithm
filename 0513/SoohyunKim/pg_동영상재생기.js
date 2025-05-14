function solution(video_len, pos, op_start, op_end, commands) {
  const videoLen = parseTime(video_len)
  const ops = parseTime(op_start)
  const ope = parseTime(op_end)
  let ans = parseTime(pos)

  for (const cmd of commands) {
    ans = skip(ans, ops, ope)
    
    if (cmd === "prev") {
      ans.s -= 10
    } else if (cmd === "next") {
      ans.s += 10
    }

    ans = calc(ans, videoLen)
  }
  
  ans = skip(ans, ops, ope)
  return formatTime(ans)
}

// "mm:ss" → { m, s }
function parseTime(str) {
  const [m, s] = str.split(":").map(Number)
  return { m, s }
} 

// { m, s } → "mm:ss"
function formatTime({ m, s }) {
  const mm = m.toString().padStart(2, '0')
  const ss = s.toString().padStart(2, '0')
  return `${mm}:${ss}`
}

// 오프닝 건너뛰기
function skip(pos, ops, ope) {
  if (pos.m > ops.m || (pos.m === ops.m && pos.s >= ops.s)) {
    if (pos.m < ope.m || (pos.m === ope.m && pos.s <= ope.s)) {
      pos.m = ope.m
      pos.s = ope.s
    }
  }
  return pos
}

// 분초 계산 및 비디오 범위 체크
function calc({m, s}, videoLen) {
  if (s >= 60) {
    m += Math.floor(s / 60)
    s %= 60
  } else if (s < 0) {
    m -= Math.ceil(Math.abs(s) / 60)
    s = (60 + s) % 60
  }

  if (
    m > videoLen.m ||
    (m === videoLen.m && s > videoLen.s)
  ) {
    return { ...videoLen }
  }

  if (m < 0) {
    return { m: 0, s: 0 }
  }

  return { m, s }
}
