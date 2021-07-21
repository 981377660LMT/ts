// This enables module augmentation mode.
import 'date-wizard'

declare module 'date-wizard' {
  // Add your module extensions here.
  function dateWizard(date: string, format: string): string
  function pad(s: number): string
  interface DateDetails {
    year: number
    month: number
    date: number
    hours: number
    minutes: number
    seconds: number
  }
  function dateDetails(date: Date): DateDetails
}
