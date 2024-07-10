import { IDepartment } from '../../shared/interfaces/IDepartment'
import { ISkill } from '../../shared/interfaces/ISkill'
import { ISkillMastery } from '../../shared/interfaces/ISkillMastery'

function hasId(
  option: IDepartment | ISkill | string | ISkillMastery
): option is IDepartment | ISkill {
  return (option as IDepartment | ISkill).id !== undefined
}
export default hasId
