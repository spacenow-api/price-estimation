import * as dynamoDbLib from "../libs/dynamodb-lib"
import { success, failure } from "../libs/response-lib"

export const main = async (event, context) => {
  
  const params = {
    TableName: process.env.tableName
  }

  try {
    const result = await dynamoDbLib.call("scan", params);
    return success({count:result.Items.length, results: result.Items})
  } catch (e) {
    return failure({ status: false })
  }

}