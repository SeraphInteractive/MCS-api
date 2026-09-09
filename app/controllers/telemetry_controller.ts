import { HttpContext } from '@adonisjs/core/http'
import RaidService from '#services/raid_service'
import eventBus from '#services/event_bus'

export default class TelemetryController {
  async index({ params }: HttpContext) {
    const raidService = new RaidService()
    const telemetry = await raidService.getRoundTelemetry(params.roundId)
    return { data: telemetry }
  }

  async show({ params }: HttpContext) {
    const raidService = new RaidService()
    const telemetry = await raidService.getEntryTelemetry(params.entryId, params.roundId)
    return { data: telemetry }
  }

  async stream({ params, response }: HttpContext) {
    const res = response.response
    
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    })

    const onRaidAlert = (data: any) => {
      res.write(`event: raid:alert\ndata: ${JSON.stringify(data)}\n\n`)
    }

    const onBallotSubmitted = (data: any) => {
      res.write(`event: ballot:submitted\ndata: ${JSON.stringify(data)}\n\n`)
    }

    // subscribe to events for this specific roundId
    eventBus.on(`raid:alert:${params.roundId}`, onRaidAlert)
    eventBus.on(`ballot:submitted:${params.roundId}`, onBallotSubmitted)

    // clean up on connection close
    res.on('close', () => {
      eventBus.off(`raid:alert:${params.roundId}`, onRaidAlert)
      eventBus.off(`ballot:submitted:${params.roundId}`, onBallotSubmitted)
    })
  }
}
