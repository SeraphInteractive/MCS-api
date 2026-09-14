import vine from '@vinejs/vine'

export const createEntryValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(1).maxLength(255),
    description: vine.string().trim().maxLength(1500).optional().nullable(),
    mediaUrl: vine.string().trim().optional().nullable(),
    submittedBy: vine.string().trim().optional().nullable()
  })
)

export const updateEntryValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(1).maxLength(255).optional(),
    description: vine.string().trim().maxLength(1500).optional().nullable(),
    mediaUrl: vine.string().trim().optional().nullable(),
    submittedBy: vine.string().trim().optional().nullable()
  })
)

export const updateEntryStatusValidator = vine.compile(
  vine.object({
    status: vine.enum(['pending_review', 'approved', 'rejected', 'flagged'] as const)
  })
)

