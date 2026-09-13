import vine from '@vinejs/vine'

export const createShotValidator = vine.compile(
  vine.object({
    roundId: vine.string().uuid().optional().nullable(),
    sceneNumber: vine.number().positive(),
    shotCode: vine.string().trim().minLength(1).maxLength(50),
    title: vine.string().trim().minLength(1).maxLength(255),
    description: vine.string().trim().optional().nullable(),
    difficultyTier: vine.enum(['easy', 'medium', 'hard', 'complex'] as const),
    seniorPriorityHours: vine.number().min(0).max(168).optional().nullable(),
  })
)

export const updateShotValidator = vine.compile(
  vine.object({
    roundId: vine.string().uuid().optional().nullable(),
    sceneNumber: vine.number().positive().optional(),
    shotCode: vine.string().trim().minLength(1).maxLength(50).optional(),
    title: vine.string().trim().minLength(1).maxLength(255).optional(),
    description: vine.string().trim().optional().nullable(),
    difficultyTier: vine.enum(['easy', 'medium', 'hard', 'complex'] as const).optional(),
    status: vine.enum(['available', 'claimed', 'submitted', 'approved'] as const).optional(),
  })
)

export const getUploadUrlValidator = vine.compile(
  vine.object({
    filename: vine.string().trim().minLength(1).maxLength(255),
    contentType: vine.string().trim().optional().nullable(),
  })
)

export const submitWorkValidator = vine.compile(
  vine.object({
    videoUrl: vine.string().trim().minLength(1),
    blendUrl: vine.string().trim().optional().nullable(),
    notes: vine.string().trim().optional().nullable(),
  })
)

export const reviewDecisionValidator = vine.compile(
  vine.object({
    status: vine.enum(['approved', 'revision_requested'] as const),
    supervisorNotes: vine.string().trim().optional().nullable(),
  })
)
