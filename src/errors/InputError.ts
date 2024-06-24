import UIError from "./UIError"

export default class InputError extends UIError {
  constructor(message: string) {
    super(message)
  }
}
