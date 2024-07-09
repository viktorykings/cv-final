export interface ISkillMastery {
  name: string
  category?: string
  mastery: SkillLevel
}

export type SkillLevel = 'Novice' | 'Advanced' | 'Competent' | 'Proficient' | 'Expert'

export enum Mastery {
  Novice = 'Novice',
  Advanced = 'Advanced',
  Competent = 'Competent',
  Proficient = 'Proficient',
  Expert = 'Expert'
}
