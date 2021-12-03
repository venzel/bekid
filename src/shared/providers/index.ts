import { GererateIdProviderStrategy } from './GenerateIdProvider/GererateIdProviderStrategy';
import { CacheProviderStrategy } from './CacheProvider/CacheProviderStrategy';
import { MailProviderStrategy } from './MailProvider/MailProviderStrategy';
import { QueueProviderStrategy } from './QueueProvider/QueueProviderStrategy';
import { StorageProviderStrategy } from './StorageProvider/StorageProviderStrategy';
import { generate_id_strategy, cache_strategyr, mail_strategy, queue_strategy, storage_strategy } from '../../configs/providers';

new GererateIdProviderStrategy().setStrategy(generate_id_strategy);
new CacheProviderStrategy().setStrategy(cache_strategyr);
new MailProviderStrategy().setStrategy(mail_strategy);
new QueueProviderStrategy().setStrategy(queue_strategy);
new StorageProviderStrategy().setStrategy(storage_strategy);
