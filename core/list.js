import * as dynamoDbLib from '../libs/dynamodb-lib'
import { success, failure } from '../libs/response-lib'

export const main = async () => {
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
