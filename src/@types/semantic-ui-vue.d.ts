declare module 'semantic-ui-vue' {
    import { VueConstructor, PluginObject } from 'vue';
    import 'semantic-ui-vue';
    export interface suv extends PluginObject<any> {
    }
    const instance: suv;
    export default instance;

    export const Icon: any;
}
