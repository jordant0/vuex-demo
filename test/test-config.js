const VueTestUtils = require('@vue/test-utils')

const vuetifyComponents = [
  'v-avatar',
  'v-btn',
  'v-card',
  'v-card-actions',
  'v-card-text',
  'v-card-title',
  'v-dialog',
  'v-form',
  'v-snackbar',
  'v-text-field',
];

for (var i = 0; i < vuetifyComponents.length; ++i) {
  var componentName = vuetifyComponents[i];

  VueTestUtils.config.stubs[componentName] = `<div class="stub-vuetify-${componentName.replace('v-', '')}"><slot /></div>`;
}

VueTestUtils.config.stubs['v-badge'] = '<div class="stub-vuetify-badge"><slot name="badge" /><slot /></div>'

window.flushPromises = () => {
  return new Promise((resolve, reject) => setImmediate(resolve, 0));
}
