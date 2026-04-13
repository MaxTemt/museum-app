export interface Exhibit {
  id: string
  name: string
  category: string
  era: string
  acquisitionYear: number
  description: string
  imageUrl?: string
}
export interface Visitor {
  id: string
  name: string
  ticketType: 'standard' | 'student' | 'child' | 'vip'
  visitDate: string
  status: 'active' | 'completed' | 'cancelled'
}
export interface Event {
  id: string
  name: string
  startDate: string
  endDate: string
  location: string
  description: string
}
