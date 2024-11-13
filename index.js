const app = require('./app') // The Express app
//const config = require('./utils/config')
const logger = require('./utils/logger')

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`)
})