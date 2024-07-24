export interface ILanguageProficiency {
  id: string
  name: string
  native_name: string
  iso2: string
  proficiency: keyof typeof Proficiency
}
export enum Proficiency {
  A1 = 'A1',
  A2 = 'A2',
  B1 = 'B1',
  B2 = 'B2',
  C1 = 'C1',
  C2 = 'C2',
  Native = 'Native'
}
