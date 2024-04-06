'use strict'
import 'dotenv/config';

import neo4j from 'neo4j-driver';
import   database  from '../config/neo4j.config';
import { baseError } from '../system/core/error/baseError';

import { neo4jDriver } from '../helpers/neo4j';

export default  {
    read: async (cypher, params = {}) => {
        const session = neo4jDriver.session({
            database,
            defaultAccessMode: neo4j.session.READ
        });

        return await session.run(cypher, params).then(result => {
            return result;
        }).catch(err => {
            session.close();
            throw new baseError(err);
        });
    },
    write: async (cypher, params = {}) => {
        const session = neo4jDriver.session({
            database,
            defaultAccessMode: neo4j.session.WRITE
        });

        if(params?.rights) delete params.rights;

        return await session.run(cypher, params).then(result => {
            session.close();
            return result.records;
        }).catch(err => {
            console.error(err)
            session.close();
            //throw new baseError(err);
        });
    },
}