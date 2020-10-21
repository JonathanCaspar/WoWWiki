import warriorIcon from '../assets/classes_icon/warrior_icon.jpg'
import paladinIcon from '../assets/classes_icon/paladin_icon.jpg'
import hunterIcon from '../assets/classes_icon/hunter_icon.jpg'
import rogueIcon from '../assets/classes_icon/rogue_icon.jpg'
import priestIcon from '../assets/classes_icon/priest_icon.jpg'
import deathknightIcon from '../assets/classes_icon/deathknight_icon.jpg'
import shamanIcon from '../assets/classes_icon/shaman_icon.jpg'
import mageIcon from '../assets/classes_icon/mage_icon.jpg'
import warlockIcon from '../assets/classes_icon/warlock_icon.jpg'
import monkIcon from '../assets/classes_icon/monk_icon.jpg'
import druidIcon from '../assets/classes_icon/druid_icon.jpg'
import demonhunterIcon from '../assets/classes_icon/demonhunter_icon.png'


export function getClassAssetById(id) {
  switch (id) {
    case 1:
      return warriorIcon
    case 2:
      return paladinIcon
    case 3:
      return hunterIcon
    case 4:
      return rogueIcon
    case 5:
      return priestIcon
    case 6:
      return deathknightIcon
    case 7:
      return shamanIcon
    case 8:
      return mageIcon
    case 9:
      return warlockIcon
    case 10:
      return monkIcon
    case 11:
      return druidIcon
    case 12:
      return demonhunterIcon
    default:
      return null
  }
}
