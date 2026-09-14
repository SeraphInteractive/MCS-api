import { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import { randomUUID } from 'node:crypto'

export default class UploadsController {
  async store({ request, response }: HttpContext) {
    const file = request.file('file', {
      size: '5mb',
      extnames: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'mp4', 'webm', 'mov']
    })

    if (!file) {
      return response.badRequest({
        error: 'No file provided. Please upload an image or video file under 5MB.'
      })
    }

    if (!file.isValid) {
      return response.badRequest({
        error: file.errors.map((e) => e.message).join(', ')
      })
    }

    const fileName = `${randomUUID()}.${file.extname}`
    await file.move(app.makePath('public/uploads'), {
      name: fileName,
      overwrite: true
    })

    const url = `/uploads/${fileName}`

    return {
      data: {
        url,
        fileName,
        size: file.size,
        extname: file.extname
      }
    }
  }
}
