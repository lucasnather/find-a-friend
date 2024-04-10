import multer from "fastify-multer"
import { randomBytes } from "node:crypto"

export const upload = multer({
	dest: 'storage/uploads',
    fileFilter: (_, file, cb) => {
		const mimes = [
			'image/png',
			'image/jpeg',
			'image/pjpeg',
			'image/jpg',
		]

		if (mimes.includes(file.mimetype)) {
			cb(null, true)
		} else {
			cb(new Error('Invalid mime'))
		}
	},
    limits: {
		fileSize: 10 * 1024 * 1024
	},
	storage: multer.diskStorage({
		destination: (_, file, cb) => {
			cb(null, 'storage/uploads')
		},
		filename: (_, file, cb) => {
			randomBytes(16, (err, hash) => {
				if (err) cb(err)

				const filename = `${file.originalname}`

				cb(null, filename)
			})
		}
	})
})
  