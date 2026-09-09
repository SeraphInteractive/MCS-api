import { EventEmitter } from 'node:events'

export interface EventMap {
  'raid:alert': { entryId: string; roundId: string; severity: string; compositeScore: number }
  'ballot:submitted': { roundId: string; voterId: string; entryIds: string[] }
  'round:finalized': { roundId: string; resultId: string }
}

export class EventBus {
  private emitter = new EventEmitter()

  emit(event: string, payload: any): boolean {
    // broadcast the generic event
    const handled = this.emitter.emit(event, payload)
    
    // if payload has roundId, also broadcast to round-specific channel
    if (payload && typeof payload === 'object' && 'roundId' in payload) {
      this.emitter.emit(`${event}:${payload.roundId}`, payload)
    }

    return handled
  }

  on(event: string, listener: (payload: any) => void): this {
    // hook up a new listener
    this.emitter.on(event, listener)
    return this
  }

  off(event: string, listener: (payload: any) => void): this {
    // remove listener
    this.emitter.off(event, listener)
    return this
  }
}

export const eventBus = new EventBus()
export default eventBus
