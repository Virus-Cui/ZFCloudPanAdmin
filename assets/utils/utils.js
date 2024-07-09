import {h} from "vue";
import {NIcon} from "naive-ui";
import NuxtLink from "#app/components/nuxt-link.js";

export async function asyncRenderIcon(icon) {
    const {[icon]: iconComp} = await import("@vicons/antd");
    return () => h(NIcon, null, {default: () => h(iconComp)});
}

export function RenderIcon(icon) {
    const {[icon]: iconComp} = import("@vicons/antd");
    return () => h(NIcon, null, {default: () => h(iconComp)});
}

export const gen_router_paths = async (arr) => {
    let result = []
    for (let i = 0; i < arr.length; i++) {
        let element = arr[i];
        if (element.menuRouterPath != null) {
            console.log(element.icon != null)
            if (element.icon != null) {
                // element.menuName
                result.push({
                    label: element.menuType == 'ITEM' ? element.outline ? () => h(
                        'a', {
                            href: element.menuRouterPath,
                            target: '_blank'
                        },
                        element.menuName
                    ) : () => h(NuxtLink, {
                        to: element.menuRouterPath
                    }, element.menuName): element.menuName,
                    key: element.menuRouterPath,
                    disabled: element.disable,
                    icon: element.icon != '' ? await asyncRenderIcon(element.icon) : null
                })
            } else {
                result.push({
                    label: element.menuType == 'ITEM' ? element.outline ? () => h(
                        'a', {
                            href: element.menuRouterPath,
                            target: '_blank'
                        },
                        element.menuName
                    ) : () => h(NuxtLink, {
                        to: element.menuRouterPath
                    }, element.menuName): element.menuName,
                    key: element.menuRouterPath,
                    disabled: element.disable
                })
            }

        }
        if (element.treeMenus != undefined && element.treeMenus.length != 0) {
            let children = await gen_router_paths(element.treeMenus)
            if (children.length != 0) {
                result[i].children = children;
            }
        }
    }
    return result
}