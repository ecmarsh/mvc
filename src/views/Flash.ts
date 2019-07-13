type ErrorMessage = string

export class Flash {
  protected error?: Error

  constructor() {
    this.error = void Error()
  }

  public set = (error?: Error): void => {
    this.error = error || undefined
  }

  public get = (): ErrorMessage | undefined => {
    if (this.error) {
      return this.error.message
    }
  }

  public clear = (): void => {
    this.set(undefined)
  }

  public flash = (): string => {
    const style = `
      padding: 10px 20px;
      border-left: 10px solid red;
    `

    if (this.get()) {
      return `
        <div class="error" style="${style}">
          <strong>Shoot!</strong>&nbsp;${this.get()}
        </div>
      `
    } else {
      return `<span><!--Errors Here--></span>`
    }
  }
}