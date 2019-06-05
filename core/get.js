import * as dynamoDbLib from "../libs/dynamodb-lib"
import { success, failure } from "../libs/response-lib"

export const main = async (event, context) => {
  
  const params = {
    TableName: process.env.tableName,
    FilterExpression: "#suburb = :suburb AND #state = :state",
    ExpressionAttributeNames:{
        "#suburb": "suburb",
        "#state": "state"
    },
    ExpressionAttributeValues: {
      ":suburb": event.pathParameters.suburb,
      ":state": event.pathParameters.state
    }
  }

  try {
    const result = await dynamoDbLib.call("scan", params);
    return success({count:result.Items.length, bookings: result.Items})
  } catch (e) {
    return failure({ status: false })
  }

}