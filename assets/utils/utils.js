import {h} from "vue";
import {NIcon} from "naive-ui";

export async function asyncRenderIcon(icon) {
    const {[icon]: iconComp} = await import("@vicons/fluent");
    return () => h(NIcon, null, {default: () => h(iconComp)});
}

export const gen_router_paths = async (arr) => {
    let result = []
    for (let i = 0; i < arr.length; i++) {
        let element = arr[i];
        console.log(element)
        result.push({
            label: element.name,
            key: element.path,
            disabled: element.disable,
            icon: await asyncRenderIcon(element.icon)
        })
        if (element.children != undefined) {
            result[i].children = await gen_router_paths(element.children)
        }
    }
    return result
}