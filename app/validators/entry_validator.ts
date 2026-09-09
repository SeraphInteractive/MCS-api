import vine from '@vinejs/vine'

export const createEntryValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(1).maxLength(255),
    description: vine.string().trim().optional().nullable(),
    submittedBy: vine.string().trim().optional().nullable()
  })
)

export const updateEntryValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(1).maxLength(255).optional(),
    description: vine.string().trim().optional().nullable(),
    submittedBy: vine.string().trim().optional().nullable()
  })
)
