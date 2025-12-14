import { customAlphabet } from 'nanoid'
import User from '../models/user.model.js'

const generateCode = customAlphabet('12345567890', 6)

const generateConnectCode = async () => {
    let code, exists

    do {
        code = generateCode()
        exists = await User.findOne({ connectCode: code })
    } while (exists)

    return code
}

export default generateConnectCode
