import { ISkillMastery } from '../../shared/interfaces/ISkillMastery'

const createSkillsGroups = (skills: ISkillMastery[], categories: string[]) => {
  return categories
    .map(category => ({
      cat: category,
      skills: skills.filter(skill => skill.category === category)
    }))
    .filter(el => el.skills.length)
}

export default createSkillsGroups
