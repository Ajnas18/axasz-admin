import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schema } from './schemaTypes';
import { SendWhatsAppAction } from './actions/SendWhatsAppAction';

const projectId = 'if1xc1so';
const dataset = 'production';

export default defineConfig({
  name: 'AXASZ_STORE_Studio',
  title: 'AXASZ STORE Admin',
  projectId,
  dataset,
  plugins: [structureTool()],
  schema: {
    types: schema.types,
  },
  document: {
    actions: (prev, context) => {
      // Add custom action for orders
      if (context.schemaType === 'order') {
        return [...prev, SendWhatsAppAction];
      }
      return prev;
    },
  },
});
