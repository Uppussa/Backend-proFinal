import { Router } from 'express'
import { crear, login, updateProfile, me } from '../controllers/usuario.controllers.js'

const router = Router()

router.post('/crear', crear)
router.post('/', login)
router.put('/profile', updateProfile)
router.get('/me', me)

export default router
