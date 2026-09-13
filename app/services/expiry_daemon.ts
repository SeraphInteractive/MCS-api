import grabBoxService from '#services/grab_box_service'

export class ExpiryDaemon {
  private timer: NodeJS.Timeout | null = null
  private readonly intervalMs = 15 * 60 * 1000 // 15 minutes

  start(): void {
    if (this.timer) {
      return
    }

    // run initial sweep after 10 seconds to allow server to boot
    setTimeout(() => {
      this.sweep()
    }, 10000)

    // schedule recurring interval
    this.timer = setInterval(() => {
      this.sweep()
    }, this.intervalMs)
  }

  stop(): void {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
  }

  async sweep(): Promise<void> {
    try {
      await grabBoxService.reclaimExpiredShots()
    } catch {
      // background sweep error logged silently without crashing server
    }
  }
}

export const expiryDaemon = new ExpiryDaemon()
export default expiryDaemon
