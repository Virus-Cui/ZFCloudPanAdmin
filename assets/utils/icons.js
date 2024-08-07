import {
    SettingOutlined,
    AppstoreOutlined,
    DashboardOutlined,
    BarChartOutlined,
    CloudOutlined,
    UserOutlined,
    FileOutlined,
    ShareAltOutlined
} from '@vicons/antd'
import {h} from "vue";
import {NIcon} from "naive-ui";

export const icon_mapping = [
    {
        label: 'SettingOutlined',
        value: SettingOutlined
    },
    {
        label: 'DashboardOutlined',
        value: DashboardOutlined
    },
    {
        label: 'AppstoreOutlined',
        value: AppstoreOutlined
    },
    {
        label: 'BarChartOutlined',
        value: BarChartOutlined
    },
    {
        label: 'CloudOutlined',
        value: CloudOutlined
    },
    {
        label: 'UserOutlined',
        value: UserOutlined
    },
    {
        label: 'FileOutlined',
        value: FileOutlined
    },
    {
        label: 'ShareAltOutlined',
        value: ShareAltOutlined
    }
]

export const renderIcon = (icon) => {
    return () => h(NIcon, null, {default: () => h(icon)})
}
