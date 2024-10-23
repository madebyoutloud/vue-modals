export interface ModalsConfig {
  /**
   * Close modal when user clicks on background
   * @default true
   */
  clickToClose: boolean
  /**
   * Close modal when Esc key is pressed
   * @default true
   */
  escToClose: boolean
}

export const defaults: ModalsConfig = {
  clickToClose: true,
  escToClose: true,
}
