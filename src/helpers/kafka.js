'use strict';
import 'dotenv/config';
import { Kafka, logLevel } from 'kafkajs';
import { config } from '../config/kafka.config';

const PERFORMANCE_TEST = true;

const serviceLogger = () => ({ label, log }) => {
    if (!PERFORMANCE_TEST) console.log(label + " namespace:" + log.message, log);
};

let brokers = [];
let kafka = null;
if(config.brokers)
  brokers = config.brokers.split(',');

kafka =  new Kafka({
  logLevel: logLevel.INFO,
  clientId: config.clientId,
  brokers: brokers,
  logCreator: serviceLogger,
  retry: {
    initialRetryTime: config.retryTime,
    retries: config.retry,
  },
});

export { kafka };