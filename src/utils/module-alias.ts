import moduleAlias from 'module-alias'
import * as path from 'path'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const files = path.resolve(__dirname, '../..')

moduleAlias.addAliases({
  '@src': path.join(files, 'src'),
  '@tests': path.join(files, 'tests')
})
