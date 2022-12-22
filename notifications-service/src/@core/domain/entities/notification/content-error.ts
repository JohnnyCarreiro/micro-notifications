export class InvalidContentError extends Error {
  public readonly name = 'InvalidContentError'
  constructor(value: string) {
    super('Content Erro: ' + value)
  }
}
