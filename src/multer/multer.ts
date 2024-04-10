import multer from "fastify-multer"

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
        destination: function (req, file, cb) {
          cb(null, 'storage/uploads')
        },
        filename: function (req, file, cb) {
          cb(null, file.originalname + '-' + Date.now())
        }
    })
})
  