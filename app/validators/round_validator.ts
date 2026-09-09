import vine from '@vinejs/vine'

export const createRoundValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(1).maxLength(255),
    opensAt: vine.string().optional(),
    closesAt: vine.string().optional()
  })
)

export const updateRoundValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(1).maxLength(255).optional(),
    status: vine.enum(['draft', 'open', 'closed']).optional(),
    opensAt: vine.string().optional().nullable(),
    closesAt: vine.string().optional().nullable()
  })
)
