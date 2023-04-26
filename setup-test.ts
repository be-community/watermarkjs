import { TextEncoder, TextDecoder } from 'util'
import 'jest-canvas-mock'
global.TextEncoder = TextEncoder
// eslint-disable-next-line @typescript-eslint/no-explicit-any
global.TextDecoder = TextDecoder as any

window.URL.createObjectURL = jest.fn()
global.fetch = require('jest-mock-fetch')
