export const RABBIT_EXCHANGE = 'poc.sync';
export const RABBIT_ROUTING_KEY = 'dossier.sync';
export const RABBIT_QUEUE = 'poc.sync.main';
export const RABBIT_DLQ = 'poc.sync.dlq';
export const RABBIT_DLQ_ROUTING_KEY = 'dossier.sync.dlq';


export const RABBIT_URL = 'amqp://rabbit:rabbit@localhost:5672'
export const RABBIT_CONCURRENCY = 10