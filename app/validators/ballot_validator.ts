import vine from '@vinejs/vine'

export const createBallotValidator = vine.compile(
  vine.object({
    rank1_entry_id: vine.string().uuid(),
    rank2_entry_id: vine.string().uuid(),
    rank3_entry_id: vine.string().uuid(),
  })
)
