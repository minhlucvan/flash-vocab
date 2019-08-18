declare module 'semantic-ui-vue' {
    import { VueConstructor, PluginObject } from 'vue';
    import 'semantic-ui-vue';
    // tslint:disable-next-line
    export interface suv extends PluginObject<any> {
    }
    const instance: suv;
    export default instance;

    export const Icon: any;

    export const Button: any;

    export const Progress: any;

    export const Menu: any;

    export const MenuMenu: any;

    export const MenuItem: any;

    export const Sidebar: any;

    export const SidebarPushable: any;

    export const SidebarPusher: any;

    export const MenuHeader: any;
}
