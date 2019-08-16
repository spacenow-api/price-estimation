import * as dynamoDbLib from '../libs/dynamodb-lib'
import { success, failure } from '../libs/response-lib'

const FILL_DATABASE = true

export const main = async () => {
  if (FILL_DATABASE) {
    const estimationsData = require('./../estimations.json')
    try {
      console.log('Cleaning all records...')
      await dynamoDbLib.call('delete', { TableName: process.env.tableName })
      console.log('Put all itens on price-estimation-table...')
      for (const e of estimationsData) {
        await dynamoDbLib.call('put', {
          TableName: process.env.tableName,
          Item: e
        })
      }
    } catch (err) {
      console.error(err)
      return failure({ status: false, error: err })
    }
  }
  console.log('Get all price estimations on database...')
  try {
    const result = await dynamoDbLib.call('scan', {
      TableName: process.env.tableName
    })
    return success({ count: result.Items.length, results: result.Items })
  } catch (err) {
    console.error(err)
    return failure({ status: false })
  }
}
