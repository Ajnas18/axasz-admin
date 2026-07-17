import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schema } from './schemaTypes';
import { SendWhatsAppAction } from './actions/SendWhatsAppAction';
import { PostToInstagramAction, createPublishAndInstagramAction } from './actions/PostToInstagramAction';

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
      // Wrap publish action & add manual Instagram posting for products
      if (context.schemaType === 'product') {
        const withInstagramPublish = prev.map(action => {
          if (action.action === 'publish') {
            return createPublishAndInstagramAction(action);
          }
          return action;
        });
        return [...withInstagramPublish, PostToInstagramAction];
      }
      return prev;
    },
  },
});
