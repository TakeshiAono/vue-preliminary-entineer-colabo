import InputError from "./InputError"

export default class CommunicationError extends InputError {
  constructor(message: string) {
    super(message)
  }
}
