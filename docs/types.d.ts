import { Modals } from "@outloud/vue-modals";

declare module '@outloud/vue-modals' {
  export type ConfirmProps = {
    text: string
  }

  interface Modals {
    confirm: (props: ConfirmProps) => Promise<boolean | undefined>
  }
}