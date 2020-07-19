class MgrTimer {
  constructor (id) {
    this.id = id
    this.timer = null
  }

  start (intervalSec, fun) {
    setInterval(fun, intervalSec)
  }

  stop () {
    clearInterval(this.timer)
    this.timer = null
  }
}

MgrTimer.timers = {}

MgrTimer.start = (id, sec, fun) => {
  let timer = MgrTimer.timers[id]
  if (!timer) {
    timer = new MgrTimer(id)
  }
  timer.start(sec, fun)
}

MgrTimer.startGetLatestBlockTimer = (fun) => {
  MgrTimer.start('latestBlock', 2000, fun)
}

export default MgrTimer
