import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import env from '#start/env'

export class StorageService {
  private s3Client: S3Client | null = null
  private bucket: string | null = null

  constructor() {
    const endpoint = env.get('S3_ENDPOINT')
    const region = env.get('S3_REGION') || 'auto'
    const accessKeyId = env.get('S3_ACCESS_KEY_ID')
    const secretAccessKey = env.get('S3_SECRET_ACCESS_KEY')
    this.bucket = env.get('S3_BUCKET') || null

    // initialize s3 client if credentials exist
    if (accessKeyId && secretAccessKey && this.bucket) {
      this.s3Client = new S3Client({
        region,
        endpoint: endpoint || undefined,
        credentials: {
          accessKeyId,
          secretAccessKey,
        },
        forcePathStyle: true,
      })
    }
  }

  isConfigured(): boolean {
    return this.s3Client !== null && this.bucket !== null
  }

  async getPresignedUploadUrl(
    shotId: string,
    version: number,
    filename: string,
    contentType: string = 'application/octet-stream'
  ): Promise<{ uploadUrl: string; fileKey: string; directUrl: string }> {
    // clean filename and structure path
    const safeFilename = filename.replace(/[^a-zA-Z0-9._-]/g, '_')
    const fileKey = `shots/${shotId}/v${version}/${Date.now()}_${safeFilename}`

    if (!this.s3Client || !this.bucket) {
      // fallback for development when no bucket is set
      const appUrl = env.get('APP_URL') || 'http://localhost:3333'
      return {
        uploadUrl: `${appUrl}/api/v1/mock-storage/upload?key=${encodeURIComponent(fileKey)}`,
        fileKey,
        directUrl: `${appUrl}/uploads/${fileKey}`,
      }
    }

    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: fileKey,
      ContentType: contentType,
    })

    // generate 15 minute presigned PUT url
    const uploadUrl = await getSignedUrl(this.s3Client, command, { expiresIn: 900 })

    const endpoint = env.get('S3_ENDPOINT')
    const directUrl = endpoint ? `${endpoint}/${this.bucket}/${fileKey}` : `https://${this.bucket}.s3.amazonaws.com/${fileKey}`

    return {
      uploadUrl,
      fileKey,
      directUrl,
    }
  }

  async getPresignedDownloadUrl(fileKey: string): Promise<string> {
    if (!this.s3Client || !this.bucket) {
      const appUrl = env.get('APP_URL') || 'http://localhost:3333'
      return `${appUrl}/uploads/${fileKey}`
    }

    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: fileKey,
    })

    // 1 hour signed get url
    return await getSignedUrl(this.s3Client, command, { expiresIn: 3600 })
  }
}

export const storageService = new StorageService()
export default storageService
