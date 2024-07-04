export interface ISkillMastery {
  name: string
  category?: string
  mastery: SkillLevel
}

export type SkillLevel = 'Novice' | 'Advanced' | 'Competent' | 'Proficient' | 'Expert'
