// 当前文件按需加载element-plus组件
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/display.css'


// element-plus组件注册
import { ElButton, ElRow, ElCol, ElInput, ElIcon, ElAffix, ElBacktop,ElTimeline,ElTimelineItem,ElCard,ElDrawer } from 'element-plus'

const component = [
  ElButton, ElRow, ElCol, ElInput, ElIcon, ElAffix, ElBacktop,ElTimeline,ElTimelineItem,ElCard,ElDrawer
]


// element-plus-ions注册
import { ChatLineSquare, Search, Top,StarFilled,Promotion,Share ,Location,Avatar,LocationInformation,Expand,ArrowDownBold} from '@element-plus/icons-vue'
const icons = [
  ChatLineSquare, Search, Top,StarFilled,Promotion,Share,Location,Avatar,LocationInformation,Expand,ArrowDownBold
]


export default function (app) {
  const components = [...icons, ...component]
  for (const component of components) {
    app.component(component.name, component)
  }

}