import { GererateIdProviderStrategy } from './generateIdProvider/GererateIdProviderStrategy';
import { CacheProviderStrategy } from './CacheProvider/CacheProviderStrategy';
import { MailProviderStrategy } from './MailProvider/MailProviderStrategy';
import { QueueProviderStrategy } from './QueueProvider/QueueProviderStrategy';
import { StorageProviderStrategy } from './StorageProvider/StorageProviderStrategy';
import { generate_id_provider, cache_provider, mail_provider, queue_provider, storage_provider } from '../../configs/providers';

new GererateIdProviderStrategy().setStrategy(generate_id_provider);
new CacheProviderStrategy().setStrategy(cache_provider);
new MailProviderStrategy().setStrategy(mail_provider);
new QueueProviderStrategy().setStrategy(queue_provider);
new StorageProviderStrategy().setStrategy(storage_provider);
