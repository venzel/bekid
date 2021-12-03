import { CacheProviderStrategy } from './CacheProvider/CacheProviderStrategy';
import { MailProviderStrategy } from './MailProvider/MailProviderStrategy';
import { QueueProviderStrategy } from './QueueProvider/QueueProviderStrategy';
import { StorageProviderStrategy } from './StorageProvider/StorageProviderStrategy';
import { cache_strategy, mail_strategy, queue_strategy, storage_strategy } from '../../configs/providers';

new CacheProviderStrategy().setStrategy(cache_strategy);
new MailProviderStrategy().setStrategy(mail_strategy);
new QueueProviderStrategy().setStrategy(queue_strategy);
new StorageProviderStrategy().setStrategy(storage_strategy);
