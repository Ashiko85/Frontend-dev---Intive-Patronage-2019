const app = require('express')()
const PORT = 8080

app.use(require('cors')())
app.use(require('body-parser').json())
app.use(require('./routes'))

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))
