import { PluginObject } from 'vue/types';
// This is your plugin object. It can be exported to be used anywhere

const MyPlugin: PluginObject<any> = {
  // The install method is all that needs to exist on the plugin object.
  // It takes the global Vue object as well as user-defined options.
  install(Vue, options) {
    // We call Vue.mixin() here to inject functionality into all components.
    Vue.mixin({
      // Anything added to a mixin will be injected into all components.
      // In this case, the mounted() method runs when the component is added to the DOM.
      mounted() {
        // console.log('Mounted!');
      },
    });
  },
};

export default MyPlugin;
