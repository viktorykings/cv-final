export interface IProject {
  id: number
  created_at: string
  name: string
  internal_name: string
  description: string
  domain: string
  start_date: string
  end_date?: string
  environment: string
}
