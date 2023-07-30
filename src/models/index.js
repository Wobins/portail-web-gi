// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Definition } = initSchema(schema);

export {
  Definition
};